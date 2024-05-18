const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/users', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'users.html'));
});

// ***GET*** request: filling the user list here
router.get('/users', (req, res, next) => {
    
    // starting console.log
    console.log('root page loading', 'app');
    
    // read user list file
    const fileContent = fs.readFileSync('./users.txt').toString().split('\n');
    
    // console.log the content
    console.log(fileContent);
    console.log('----------------');
    
    // add user names to the html response
    let htmlUserList = '<ul>';
    htmlUserList += fileContent.map(user => '<li>' + user + '</li>').toString().replaceAll(',','');
    htmlUserList += '</ul>'

    // add return to home page button
    htmlUserList += '<form action="/" method="GET"><button type="submit">HomePage</button></form>';

    // send the html response
    res.send(htmlUserList);
});

// ***POST*** request
router.post('/adduser', (req, res, next) => {

    // object to array conversation
    const users = Object.values(req.body);

    // console.log the user(s)
    console.log(users);

    // save the user names to the text file in the server
    fs.appendFile('users.txt', users.map(user => [ user + '\n']).toString(), () => {});

    // redirect to list users page
    res.redirect('/admin/users');
});



module.exports = router;
