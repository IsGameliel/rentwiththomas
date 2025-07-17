const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new sqlite3.Database('database.db');

const multer = require('multer');
const os = require('os');
const upload = multer({ dest: os.tmpdir() });

db.serialize(() => {
    db.run(`CREATE TABLE applications (
        monthly_rent REAL,
        deposit_offered REAL,
        date TEXT,
        time TEXT,
        occupants INTEGER,
        fullname TEXT,
        email TEXT,
        ssn TEXT,
        phone TEXT,
        smokers TEXT,
        pets TEXT,
        id_card_front TEXT,
        id_card_back TEXT,
        street_address TEXT,
        street_address_line_2 TEXT,
        city TEXT,
        state TEXT,
        postal_code TEXT,
        country TEXT,
        check_in TEXT,
        check_out TEXT,
        reason_for_vacating TEXT,
        present_landlord_first_name TEXT,
        present_landlord_last_name TEXT,
        present_landlord_phone TEXT,
        previous_landlord_first_name TEXT,
        previous_landlord_last_name TEXT,
        previous_landlord_phone TEXT,
        present_employer TEXT,
        present_street_address_line_2 TEXT,
        present_city TEXT,
        present_state_province TEXT,
        present_postal_zip_code TEXT,
        present_country TEXT,
        length_of_employment TEXT,
        current_salary_range TEXT,
        proof_of_employment TEXT,
        next_of_kin_first_name TEXT,
        next_of_kin_last_name TEXT,
        next_of_kin_relationship TEXT,
        next_of_kin_tel TEXT,
        next_of_kin_email TEXT,
        credit_report_and_score TEXT,
        credit_report_date TEXT,
        credit_report_time TEXT
    )`);
    db.run("CREATE TABLE payments (name TEXT, email TEXT, amount REAL)");
    db.run("CREATE TABLE contacts (name TEXT, email TEXT, message TEXT)");
});

app.post('/apply', upload.fields([
    { name: 'id_card_front', maxCount: 1 },
    { name: 'id_card_back', maxCount: 1 },
    { name: 'proof_of_employment', maxCount: 1 },
    { name: 'credit_report_and_score', maxCount: 1 }
]), (req, res) => {
    const stmt = db.prepare(`INSERT INTO applications VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?
    )\`);
    stmt.run(
        req.body.monthly_rent,
        req.body.deposit_offered,
        req.body.date,
        req.body.time,
        req.body.occupants,
        req.body.fullname,
        req.body.email,
        req.body.ssn,
        req.body.phone,
        req.body.smokers,
        req.body.pets,
        req.files['id_card_front'][0].path,
        req.files['id_card_back'][0].path,
        req.body.street_address,
        req.body.street_address_line_2,
        req.body.city,
        req.body.state,
        req.body.postal_code,
        req.body.country,
        req.body.check_in,
        req.body.check_out,
        req.body.reason_for_vacating,
        req.body.present_landlord_first_name,
        req.body.present_landlord_last_name,
        req.body.present_landlord_phone,
        req.body.previous_landlord_first_name,
        req.body.previous_landlord_last_name,
        req.body.previous_landlord_phone,
        req.body.present_employer,
        req.body.present_street_address_line_2,
        req.body.present_city,
        req.body.present_state_province,
        req.body.present_postal_zip_code,
        req.body.present_country,
        req.body.length_of_employment,
        req.body.current_salary_range,
        req.files['proof_of_employment'][0].path,
        req.body.next_of_kin_first_name,
        req.body.next_of_kin_last_name,
        req.body.next_of_kin_relationship,
        req.body.next_of_kin_tel,
        req.body.next_of_kin_email,
        req.files['credit_report_and_score'][0].path,
        req.body.credit_report_date,
        req.body.credit_report_time
    );
    stmt.finalize();
    res.redirect('/pay_now.html');
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    const stmt = db.prepare("INSERT INTO contacts VALUES (?, ?, ?)");
    stmt.run(name, email, message);
    stmt.finalize();
    res.send('Thank you for your message!');
});

app.post('/pay_rent', (req, res) => {
    const { name, email, amount } = req.body;
    const stmt = db.prepare("INSERT INTO payments VALUES (?, ?, ?)");
    stmt.run(name, email, amount);
    stmt.finalize();
    res.redirect('/pay_now.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
