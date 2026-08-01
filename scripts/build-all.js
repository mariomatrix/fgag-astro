import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const dataPath = path.join(rootDir, 'src', 'data', 'projekti.json');

console.log('🚀 Pokrećem Multi-Site Build Orkestraciju...\n');

try {
  const dataRaw = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(dataRaw);
  const projekti = data.projekti || [];

  if (projekti.length === 0) {
    console.warn('⚠️ Nema projekata u projekti.json!');
    process.exit(0);
  }

  const distDir = path.join(rootDir, 'dist');

  projekti.forEach((projekt, index) => {
    console.log(`\n==================================================`);
    console.log(`[${index + 1}/${projekti.length}] Gradim sajt za: ${projekt.naziv}`);
    console.log(`ID: ${projekt.id} | Poddomena: ${projekt.poddomena}`);
    console.log(`==================================================\n`);

    const targetDistName = `dist-${projekt.poddomena}`;
    const targetDistPath = path.join(rootDir, targetDistName);

    // Očisti prethodni target dist folder ako postoji
    if (fs.existsSync(targetDistPath)) {
      fs.rmSync(targetDistPath, { recursive: true, force: true });
    }
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true, force: true });
    }

    // Pokreni astro build s postavljenim PROJEKT_ID
    const env = { ...process.env, PROJEKT_ID: projekt.id };
    execSync('npx astro build', {
      cwd: rootDir,
      env: env,
      stdio: 'inherit'
    });

    // Preimenuj dist u dist-{poddomena}
    if (fs.existsSync(distDir)) {
      fs.renameSync(distDir, targetDistPath);
      console.log(`\n✅ Build uspješan! Generiran folder: ${targetDistName}/\n`);
    } else {
      console.error(`❌ Greška: Mapa dist/ nije kreirana za projekt ${projekt.id}`);
      process.exit(1);
    }
  });

  console.log('🎉 SVI BUILDOVI USPJEŠNO ZAVRŠENI!');
  console.log(`Ukupno generirano ${projekti.length} neovisnih statičkih stranica.`);

} catch (error) {
  console.error('\n❌ Greška tijekom multi-site builda:', error);
  process.exit(1);
}
