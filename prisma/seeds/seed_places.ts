require('dotenv').config({ path: '.env.local' });

import { PlaceService } from '../helpers/DbClientFactory';
import { PrismaClient } from '@prisma/client'

export async function seed_places() {
    const prisma = new PrismaClient()
    const placeService = new PlaceService(prisma);

    const places = await placeService.findAll();
    for (const p of places) {
        await placeService.delete(p.id);
    }

    const mockNames = ["mock_url_one_ninety", "alphacoffee_three", "sigma_melon_fifty", "potato_abstract_42"];

    for (const name of mockNames) {
        await placeService.create({
            name: name + '.txt',
            rawText: `React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.[9][10] A key advantage of React is that it only rerenders those parts of the page that have changed, avoiding unnecessary rerendering of unchanged DOM elements. It was first launched on 29 May 2013.` + ' '
                + "https://exampleUrl1" + '\n'
                + "Our mission is to promote the great outdoors." + ' '
                + "https://exampleUrl2" + '\n'
                + `React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.[9][10] A key advantage of React is that it only rerenders those parts of the page that have changed, avoiding unnecessary rerendering of unchanged DOM elements. It was first launched on 29 May 2013.` + '\n'
                + `React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.[9][10] A key advantage of React is that it only rerenders those parts of the page that have changed, avoiding unnecessary rerendering of unchanged DOM elements. It was first launched on 29 May 2013.` + '\n'
                + "Our company's main objective is to provide affordable running shoes for all." + '\n'
        });
    }

    await prisma.$disconnect();

    console.log("Database seeded with places!")
}
