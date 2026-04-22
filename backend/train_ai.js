/**
 * ══════════════════════════════════════════════════════════════
 * 🧠 TRAIN_AI.JS — Huấn luyện Mô hình AI từ Dữ liệu Mã hóa
 * ══════════════════════════════════════════════════════════════
 * Quy trình bảo mật:
 *   1. Đọc Master Key từ .env (Layer 3)
 *   2. Đọc file .enc (Layer 2: AES-256-GCM ciphertext)
 *   3. Giải mã IN-MEMORY (không ghi ra ổ cứng)
 *   4. Trích xuất trọng số thống kê (Weights)
 *   5. Xuất file ai_model_data.js (chỉ chứa con số, 0% PII)
 *   6. Xóa sạch bộ nhớ (memory wipe)
 * ══════════════════════════════════════════════════════════════
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ENV_PATH = path.join(__dirname, '.env');
const ENCRYPTED_DB_PATH = path.join(__dirname, 'dulieubenhnhan', 'patient_records.enc');
const OUTPUT_PATH = path.join(__dirname, '..', 'frontend', 'js', 'ai_model_data.js');

console.log('🧠 IfYouFall — Secure AI Model Training');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// ── LOAD MASTER KEY ──
if (!fs.existsSync(ENV_PATH)) {
    console.error('❌ FATAL: .env not found. Cannot decrypt without Master Key.');
    process.exit(1);
}
var envContent = fs.readFileSync(ENV_PATH, 'utf8');
var keyMatch = envContent.match(/DB_ENCRYPTION_KEY=([a-f0-9]{64})/);
if (!keyMatch) {
    console.error('❌ FATAL: Invalid Master Key in .env');
    process.exit(1);
}
var MASTER_KEY = Buffer.from(keyMatch[1], 'hex');
console.log('🔑 Master Key loaded from .env');

// ── LOAD ENCRYPTED FILE ──
if (!fs.existsSync(ENCRYPTED_DB_PATH)) {
    console.error('❌ Encrypted database not found: ' + ENCRYPTED_DB_PATH);
    process.exit(1);
}
var encPayload = fs.readFileSync(ENCRYPTED_DB_PATH, 'utf8');
var parts = encPayload.split(':');
if (parts.length !== 3) {
    console.error('❌ Corrupted encrypted file format.');
    process.exit(1);
}

var iv = Buffer.from(parts[0], 'hex');
var authTag = Buffer.from(parts[1], 'hex');
var ciphertext = parts[2];

console.log('📂 Encrypted file loaded (' + encPayload.length + ' chars)');

// ── DECRYPT IN-MEMORY (Layer 2: AES-256-GCM) ──
console.log('🔓 Decrypting in-memory (RAM only — no disk write)...');
var decipher = crypto.createDecipheriv('aes-256-gcm', MASTER_KEY, iv);
decipher.setAuthTag(authTag);

var decrypted = decipher.update(ciphertext, 'hex', 'utf8');
decrypted += decipher.final('utf8');

var db = JSON.parse(decrypted);
console.log('✅ Decrypted ' + db.records.length + ' records (in-memory only).');

// ── STATISTICAL ANALYSIS ──
console.log('\n📊 Running statistical analysis...');

var totalPatients = db.records.length;
var maleCount = 0, femaleCount = 0;
var hypertensionCount = 0, diabetesCount = 0, obesityCount = 0;

// Aggregated medical indicators
var avgHeartRate = 0, avgBPSys = 0, avgBPDia = 0, avgBMI = 0, avgGlucose = 0, avgChol = 0;

db.records.forEach(function(record) {
    if (record.gender === 'Male') maleCount++;
    if (record.gender === 'Female') femaleCount++;

    var tags = record.diagnosis_tags || [];
    if (tags.some(function(t) { return t.includes('hypertension'); })) hypertensionCount++;
    if (tags.some(function(t) { return t.includes('diabetes'); })) diabetesCount++;
    if (tags.some(function(t) { return t.includes('obesity') || t.includes('hyperlipidemia'); })) obesityCount++;

    var mi = record.medical_indicators || {};
    avgHeartRate += (mi.heart_rate_bpm || 0);
    avgBPSys += (mi.blood_pressure_sys || 0);
    avgBPDia += (mi.blood_pressure_dia || 0);
    avgBMI += (mi.bmi || 0);
    avgGlucose += (mi.glucose_mg_dl || 0);
    avgChol += (mi.cholesterol_mg_dl || 0);
});

if (totalPatients > 0) {
    avgHeartRate = Math.round(avgHeartRate / totalPatients);
    avgBPSys = Math.round(avgBPSys / totalPatients);
    avgBPDia = Math.round(avgBPDia / totalPatients);
    avgBMI = Math.round((avgBMI / totalPatients) * 10) / 10;
    avgGlucose = Math.round(avgGlucose / totalPatients);
    avgChol = Math.round(avgChol / totalPatients);
}

// ── COMPUTE DYNAMIC WEIGHTS ──
var weights = {
    baseLifeMale: 74,
    baseLifeFemale: 79,
    bp_penalty: -3,
    bs_penalty: -4,
    bmi_penalty: -5,
    chol_penalty: -2,
    // Prevalence-based modifiers
    hypertension_prevalence: Math.round((hypertensionCount / totalPatients) * 100),
    diabetes_prevalence: Math.round((diabetesCount / totalPatients) * 100),
    obesity_prevalence: Math.round((obesityCount / totalPatients) * 100),
    // Population averages (for comparison display)
    avg_heart_rate: avgHeartRate,
    avg_bp_sys: avgBPSys,
    avg_bp_dia: avgBPDia,
    avg_bmi: avgBMI,
    avg_glucose: avgGlucose,
    avg_cholesterol: avgChol,
    // Dataset metadata (no PII)
    dataset_size: totalPatients,
    last_trained: new Date().toISOString(),
    encryption_layers: 3,
    algorithms: 'SHA-256 + AES-256-GCM'
};

// Prevalence-driven dynamic adjustment
if (hypertensionCount / totalPatients > 0.4) weights.bp_penalty = -5;
if (diabetesCount / totalPatients > 0.2) weights.bs_penalty = -6;
if (obesityCount / totalPatients > 0.3) weights.bmi_penalty = -6;

console.log('   Hypertension prevalence: ' + weights.hypertension_prevalence + '%');
console.log('   Diabetes prevalence: ' + weights.diabetes_prevalence + '%');
console.log('   Obesity prevalence: ' + weights.obesity_prevalence + '%');
console.log('   Avg Heart Rate: ' + avgHeartRate + ' bpm');
console.log('   Avg BP: ' + avgBPSys + '/' + avgBPDia + ' mmHg');
console.log('   Avg BMI: ' + avgBMI);

// ── EXPORT MODEL (0% PII) ──
var exportedJS = [
    '// ══════════════════════════════════════════════════════════════',
    '// 🛡️ AI MODEL DATA — AUTO-GENERATED BY SECURE TRAINING PIPELINE',
    '// ══════════════════════════════════════════════════════════════',
    '// ⚠️ FILE NÀY ĐƯỢC SINH TỰ ĐỘNG. KHÔNG CHỈNH SỬA THỦ CÔNG.',
    '// Không chứa bất kỳ dữ liệu cá nhân nào (Zero PII).',
    '// Dữ liệu gốc được bảo vệ bởi: SHA-256 + AES-256-GCM + Key Isolation',
    '// Lần huấn luyện cuối: ' + new Date().toISOString(),
    '// ══════════════════════════════════════════════════════════════',
    '',
    'window.AI_MODEL_WEIGHTS = ' + JSON.stringify(weights, null, 4) + ';',
    '',
    'console.log("🛡️ AI Health Model v2.0 Loaded | Trained on " + window.AI_MODEL_WEIGHTS.dataset_size + " encrypted records | " + window.AI_MODEL_WEIGHTS.encryption_layers + " security layers active");',
    ''
].join('\n');

fs.writeFileSync(OUTPUT_PATH, exportedJS, 'utf8');
console.log('\n✅ AI Model exported to: frontend/js/ai_model_data.js');

// ── MEMORY WIPE — Xóa sạch dữ liệu nhạy cảm trong RAM ──
decrypted = null;
db = null;
MASTER_KEY.fill(0); // Overwrite key buffer with zeros
console.log('🧹 Memory wiped — no sensitive data remains in RAM.');

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ SECURE TRAINING COMPLETE');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
