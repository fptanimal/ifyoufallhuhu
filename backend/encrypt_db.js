/**
 * ══════════════════════════════════════════════════════════════
 * 🔐 ENCRYPT_DB.JS — Hệ thống Mã hóa Đa lớp (Multi-Layer Encryption)
 * ══════════════════════════════════════════════════════════════
 * Lớp 1: SHA-256 Hashing (Băm định danh — không thể đảo ngược)
 * Lớp 2: AES-256-GCM Encryption (Mã hóa toàn bộ payload)
 * Lớp 3: Key Isolation (.env tách biệt khỏi dữ liệu)
 * ══════════════════════════════════════════════════════════════
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// ── LOAD MASTER KEY FROM .env ──
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.error('❌ FATAL: .env file not found. Cannot encrypt without Master Key.');
    process.exit(1);
}
const envContent = fs.readFileSync(envPath, 'utf8');
const keyMatch = envContent.match(/DB_ENCRYPTION_KEY=([a-f0-9]{64})/);
if (!keyMatch) {
    console.error('❌ FATAL: DB_ENCRYPTION_KEY not found or invalid in .env');
    process.exit(1);
}
const MASTER_KEY = Buffer.from(keyMatch[1], 'hex'); // 32 bytes = AES-256

// ── FILE PATHS ──
const PLAIN_DB_PATH = path.join(__dirname, 'dulieubenhnhan', 'patient_records.json');
const ENCRYPTED_DB_PATH = path.join(__dirname, 'dulieubenhnhan', 'patient_records.enc');

console.log('🔐 IfYouFall — Multi-Layer Encryption Engine');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// ── STEP 1: READ PLAIN DATA ──
if (!fs.existsSync(PLAIN_DB_PATH)) {
    console.error('❌ Plain database not found at: ' + PLAIN_DB_PATH);
    process.exit(1);
}
const rawJSON = fs.readFileSync(PLAIN_DB_PATH, 'utf8');
const db = JSON.parse(rawJSON);
console.log('📂 Loaded ' + db.records.length + ' patient records.');

// ── STEP 2: LỚP 1 — SHA-256 HASHING (Băm định danh) ──
console.log('\n🔹 LỚP 1: SHA-256 Hashing...');
db.records.forEach(function(record, index) {
    // Hash patient_id — không thể đảo ngược
    var originalId = record.patient_id;
    record.patient_id = crypto.createHash('sha256').update(originalId + 'ifyoufall_salt_2026').digest('hex').substring(0, 16);
    
    // Hash received_from_b2b — ẩn nguồn đối tác
    if (record.received_from_b2b) {
        record.received_from_b2b = crypto.createHash('sha256').update(record.received_from_b2b + 'b2b_salt').digest('hex').substring(0, 12);
    }
    
    console.log('   [' + (index + 1) + '] ' + originalId + ' → ' + record.patient_id + ' (SHA-256 hashed)');
});

// ── STEP 3: LỚP 2 — AES-256-GCM ENCRYPTION (Mã hóa toàn bộ) ──
console.log('\n🔹 LỚP 2: AES-256-GCM Encryption...');

// Generate a random IV (Initialization Vector) — 12 bytes cho GCM
var iv = crypto.randomBytes(12);

// Create cipher
var cipher = crypto.createCipheriv('aes-256-gcm', MASTER_KEY, iv);

// Encrypt the entire JSON payload
var hashedJSON = JSON.stringify(db);
var encrypted = cipher.update(hashedJSON, 'utf8', 'hex');
encrypted += cipher.final('hex');

// Get authentication tag (GCM integrity check)
var authTag = cipher.getAuthTag().toString('hex');

console.log('   ✅ Data encrypted successfully.');
console.log('   📏 Original size: ' + rawJSON.length + ' bytes');
console.log('   📏 Encrypted size: ' + encrypted.length + ' chars (hex)');
console.log('   🔑 IV: ' + iv.toString('hex'));
console.log('   🏷️  Auth Tag: ' + authTag.substring(0, 16) + '...');

// ── STEP 4: WRITE ENCRYPTED FILE ──
// Format: IV (24 hex) : AuthTag (32 hex) : Ciphertext
var encryptedPayload = iv.toString('hex') + ':' + authTag + ':' + encrypted;

fs.writeFileSync(ENCRYPTED_DB_PATH, encryptedPayload, 'utf8');
console.log('\n🔹 LỚP 3: Key Isolation — Master Key secured in .env (separate from data).');
console.log('   📁 Encrypted file saved: patient_records.enc');

// ── STEP 5: DELETE PLAIN JSON FILE ──
fs.unlinkSync(PLAIN_DB_PATH);
console.log('\n🗑️  DESTROYED plain JSON file (patient_records.json) — no trace left.');

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ ENCRYPTION COMPLETE — 3 Layers Active:');
console.log('   🔹 Layer 1: SHA-256 Hash (Patient IDs & B2B Sources)');
console.log('   🔹 Layer 2: AES-256-GCM (Full Data Encryption)');
console.log('   🔹 Layer 3: Key Isolation (.env separated)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
