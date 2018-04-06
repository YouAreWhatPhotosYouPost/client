function getNewQuote() {

    let quotes;    
    let author;

    $.ajax({
        url: 'http://api.forismatic.com/api/1.0/',
        jsonp: 'jsonp',
        dataType: 'jsonp',
        data: {
            method: 'getQuote',
            lang: 'en',
            format: 'jsonp'
        },
        success: function(response) {
            
            quotes = response.quoteText;
            author = response.quoteAuthor;

            if (!author) {
                author = '~ unknown'
            } else {
                author = '~' + " " + response.quoteAuthor
            }

            $('#quoteText').text(quotes)
            $('#quoteAuthor').text(author)

            console.log(response);

            let objQuotes = {
                quotes: quotes,
                author: author
            }

            axios.post('http://localhost:3000/quotes/save', objQuotes)
            .then(function(response) {
                console.log('ini response', response)
            })
            .catch(function(error) {
                console.log('ini error', error)
            })
        }
    })
}


function showQuotes() {

    axios.get('http://localhost:3000/quotes')
    .then(function(response) {
        console.log('ini show quotes', response)
    })
    .catch(function(error) {
        console.log('ini error show quotes', error)
    })

}

