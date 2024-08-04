require('dotenv').config({ path: '.env.local' });

import axios from 'axios';
import * as path from 'path';
import { promises as fs } from 'fs';

// finalize new Extract Transform Load pipeline workflow
// get yourself a fucking job you idiot

const en = (str: string) => encodeURIComponent(str);

export async function getRunningShoeStores(keyword: string, cityState: string, radius: number = 5000) {
    const baseUrl = `${process.env.HOST}:${process.env.PORT}/api`;
    const coordinates = ((await axios.get(`${baseUrl}/coordinates-from-city-state?cityState=${cityState}`)).data);
    const queryParamString = `?keyword=${en(keyword)}&lat=${coordinates.lat}&lng=${coordinates.lng}&radius=${radius}`;
    const url = `${baseUrl}/places${queryParamString}`;
    console.log('SENDING.....', url);
    const response = await axios.get(url);
    return response.data;
}

async function jsonAsString(data: any) {
    return JSON.stringify(data, null, 2);
}

async function writeToRaw(str: string) {
    const filepath = path.join(__dirname, './raw', 'running_shoe_stores.json')
    await fs.writeFile(filepath, str);
    console.log('written to.. vscode://file' + filepath);
}

async function main() {
    const USAGE_STRING = 'Usage: node program.js <keyword> <cityState>';

    const args = process.argv.slice(2);
    if (args.length !== 2) console.log(USAGE_STRING)

    const [keyword, cityState] = args;

    if (!keyword || !cityState || typeof keyword !== 'string' || typeof cityState !== 'string') {
        console.log(USAGE_STRING);
    }

    console.log(`keyword: ${keyword}, cityState: ${cityState}`);
    const runningShoeStores = await getRunningShoeStores(keyword, cityState);
    const str = await jsonAsString(runningShoeStores);
    await writeToRaw(str);
}

main().then().catch(err => console.log(err))