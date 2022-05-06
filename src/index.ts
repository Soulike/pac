import axios from 'axios';
import {promises as fsPromises} from 'fs';
import path from 'path';

const url = process.env['URL'] as string;

(async () =>
{
    const {
        status,
        statusText,
        data,
    } = await axios.get(url, {
        transformResponse: [data =>
        {
            const base64Buffer = Buffer.from(data, 'base64');
            return base64Buffer.toString('utf-8');
        }],
    });

    if (status === 200)
    {
        const dist = path.join(__dirname, '..', 'proxy.pac');
        await fsPromises.writeFile(dist, data, 'utf-8');
        console.log(`Update succeed.`);
    }
    else
    {
        console.error(`Request failed: ${statusText}.`);
    }
})();