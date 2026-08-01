import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const schemaPath = path.join(rootDir, 'src', 'data', 'projekti-schema.json');
const dataPath = path.join(rootDir, 'src', 'data', 'projekti.json');

console.log('🔍 Pokrećem JSON schema validaciju za projekti.json...\n');

try {
  const schemaRaw = fs.readFileSync(schemaPath, 'utf-8');
  const dataRaw = fs.readFileSync(dataPath, 'utf-8');

  const schema = JSON.parse(schemaRaw);
  const data = JSON.parse(dataRaw);

  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);

  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (valid) {
    console.log('✅ Uspješna validacija! projekti.json odgovara JSON shemi.');
    console.log(`📊 Ukupno pronađeno projekata: ${data.projekti?.length || 0}\n`);
    process.exit(0);
  } else {
    console.error('❌ Greška pri validaciji projekti.json:\n');
    validate.errors?.forEach((err, idx) => {
      console.error(` ${idx + 1}. Putanja: ${err.instancePath || '/'}`);
      console.error(`    Poruka: ${err.message}`);
      if (err.params) {
        console.error(`    Detalji:`, err.params);
      }
      console.error('');
    });
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Kritična greška pri učitavanju ili parsiranju datoteka:', error);
  process.exit(1);
}
