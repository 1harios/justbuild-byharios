import { Button, Frog } from 'frog'
import { handle } from 'frog/vercel'
import { Box, Image, VStack, vars } from "../lib/ui.js";
import { randomInt } from 'crypto';

// Uncomment this packages to tested on local server
// import { devtools } from 'frog/dev';
// import { serveStatic } from 'frog/serve-static';

const baseUrl = "https://warpcast.com/~/compose";
const text = "Find out what kind of 👷 JustBuilder you are\n/justbuild";
const embedUrl = "https://by-harios-justbuild.vercel.app/api/frame";

const BROWSER_LOCATION = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrl)}`;

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api/frame',
  imageAspectRatio: '1:1',
  imageOptions: {
    height: 1024,
    width: 1024,
  },
  ui: { vars },
  browserLocation: BROWSER_LOCATION
})

// Array of image URLs with aspect ratio 1.22:1
const images = [
  { id: '1', url: '/images/img1.png' },
  { id: '2', url: '/images/img2.png' },
  { id: '3', url: '/images/img3.png' },
  { id: '4', url: '/images/img4.png' },
  { id: '5', url: '/images/img5.png' },
  { id: '6', url: '/images/img6.png' },
  { id: '7', url: '/images/img7.png' },
  { id: '8', url: '/images/img8.png' },
  { id: '9', url: '/images/img9.png' },
  { id: '10', url: '/images/img10.png' },
];

app.frame('/', (c) => {
  return c.res({
    title: 'JustBuilder',
    image: '/Main.png',
    intents: [
      <Button action="/button-pressed">Find out what kind of 👷 JustBuilder you are</Button>,
    ],
  })
});

app.frame('/button-pressed', (c) => {
  const randomIndex = randomInt(images.length);
  const selectedImage = images[randomIndex];

  const baseUrl = "https://warpcast.com/~/compose";
  const text = ">Find out what kind of 👷 JustBuilder you are\n/justbuild";
  const embedUrlByUser = `https://by-harios-justbuild.vercel.app/api/frame/shared/${selectedImage.id}`;

  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrlByUser)}`;

  return c.res({
    title: 'Just Build',
    image: (
      <Box
        grow
        alignVertical="center"
        backgroundColor="black"
        height="100%"
      >
        <VStack gap="4">
          <Box
            grow
            alignVertical="center"
            backgroundColor="white"
            padding="40"
            height="100%"
          >
            <Image
              height="100%"
              width="100%"
              objectFit="contain"
              src={selectedImage.url}
            />
          </Box>
        </VStack>
      </Box>
    ),
    intents: [
      <Button action="/">🔄 Try again</Button>,
      <Button.Link href={SHARE_BY_USER}>↪️ Share</Button.Link>,
    ],
  });
});

app.frame('/shared/:imageId', (c) => {
  const imageId = c.req.param('imageId');
  const selectedImage = images.find(img => img.id === imageId)?.url || '/Main.png';

  return c.res({
    title: 'Just Build',
    image: (
      <Box
        grow
        alignVertical="center"
        backgroundColor="black"
        height="100%"
      >
        <VStack gap="4">
          <Box
            grow
            alignVertical="center"
            backgroundColor="white"
            padding="40"
            height="100%"
          >
            <Image
              height="100%"
              width="100%"
              objectFit="contain"
              src={selectedImage}
            />
          </Box>
        </VStack>
      </Box>
    ),
    intents: [
      <Button action="/">🔄 Try again</Button>,
      <Button.Link href={BROWSER_LOCATION}>↪️ Share</Button.Link>,
    ],
  });
});


// Uncomment this line code to tested on local server
// devtools(app, { serveStatic });

export const GET = handle(app)
export const POST = handle(app)
