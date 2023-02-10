const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('realTimeProducts', { 
        style : 'stylesSocket.css'
    })
})

module.exports = router