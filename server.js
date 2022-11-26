var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var md5 = require('md5');
var cookieParser = require('cookie-parser');
const url = require('url');
const fs = require('fs')
const ejs = require('ejs')
const TEAM_LINK = process.env.TEAM_LINK


const flag = "ping{m15c_ch4ll5_r0ck_08bc5cd52ce0afcd085fa2b1ab63b5a7}";
let hashes = fs.readFileSync('hashes.txt', 'utf8')
hashes = hashes.split('\n')
hashes = hashes.slice(0, 1001);
app.use(cookieParser());

app.use(express.static('views'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	let code = req.cookies.captcha;
	if (hashes.indexOf(req.cookies.captcha) === -1) {
		res.cookie('captcha', hashes[0], { maxAge: 900000, httpOnly: false });
		res.cookie('turn', "0", { maxAge: 900000, httpOnly: false });
	} else if (req.cookies.captcha === hashes[hashes.length - 1]) {
		res.cookie('flag', flag, { maxAge: 900000, httpOnly: false });
	}
	res.render('login', { TEAM_LINK: TEAM_LINK });
});

app.post('/login', (req, res) => {
	let code = req.body.captcha.trim();
	if (hashes.indexOf(code) !== -1) {
		if (code === hashes[hashes.length - 1]) {
			res.cookie('flag', flag, { maxAge: 900000, httpOnly: false });
			res.cookie('captcha', 'Congratz! Make sure to check your cookies', { maxAge: 900000, httpOnly: false });
			res.cookie('turn', "", { maxAge: 900000, httpOnly: false });
		} else {
			let index = hashes.indexOf(code);
			res.cookie('captcha', hashes[index + 1], { maxAge: 900000, httpOnly: false });
			res.cookie('turn', index.toString(), { maxAge: 900000, httpOnly: false });
		}
	} else {
		res.cookie('captcha', hashes[0], { maxAge: 900000, httpOnly: false });
		res.cookie('turn', "0", { maxAge: 900000, httpOnly: false });
	}
	res.render('login', { TEAM_LINK: TEAM_LINK });
})

app.get('/*', (req, res) => {
	res.render('/404');
})

app.listen(80, function () {
	console.log("Listening on 80!")
})

