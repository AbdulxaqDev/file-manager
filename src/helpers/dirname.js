import { dirname, join} from 'node:path';
import { fileURLToPath } from 'node:url';

export function __dirname(metaUrl, ...path){
    return join(dirname(fileURLToPath(metaUrl)), ...path);
}