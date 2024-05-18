const express = require('express');
const bp = require('body-parser');
const path = require('path');

// express initializing
const app = express();

// routers
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const testRoutes = require('./routes/test');

// data encoding
app.use(bp.urlencoded({extended: false}));


// routing to the pages
app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);
app.use('/test', testRoutes);

// 404 page
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// start server
app.listen(1300);