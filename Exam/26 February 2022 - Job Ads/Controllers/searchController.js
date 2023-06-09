const { searchUser } = require('../services/searchService');
const { partserError } = require('../util/parser');

const searchController = require('express').Router();

searchController.get('/', (req, res) => {
    res.render('search', {
        title: 'Search',
        hasInfo: false,
    })
});

searchController.post('/', async (req, res) => {
    const body = req.body;

    
    try {
        if(body.searchData === '') {
            throw new Error('Email Field is required');
        }
    
        const searchData = await searchUser(body.searchData);
        
        res.render('search', {
            title: 'Search',
            data: searchData,
            hasData: searchData.length,
            hasInfo: true,
            body: {
                info: body.searchData,
            }
        })
    } catch (err) {
        res.render('search', {
            title: 'Search',
            body: {
                info: body.info,
                hasInfo: false
            },
            error: partserError(err),
        })
    }
})

module.exports = searchController;