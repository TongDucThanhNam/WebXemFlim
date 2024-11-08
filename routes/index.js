const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    let page = req.query.page || 1
    let api = `https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=${page}`

    let data = fetch(
        api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(res => res.json())
        .then(json => {
            return json
        })
        .catch(err => {
            console.log(err)
        })

    //
    Promise.all([data]).then(values => {
        console.log(values[0].items)
        res.render('index', {title: 'Express', data: values[0].items});
    })
});

router.get('/phim/:id', function (req, res, next) {
    let slug = req.params.id
    let api = `https://phim.nguonc.com/api/film/${slug}`

    let data = fetch(
        api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
    //
    Promise.all([data]).then(values => {
        console.log(values[0].movie.episodes[0].items[0])
        res.render('phim', {title: 'Phim', data: values[0].movie.episodes[0].items[0] });
    })

})

module.exports = router;
