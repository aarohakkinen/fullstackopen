const dummy = (blogs) => {
    return blogs ? 1 : 1
}

const totalLikes = (blogs) => {
    return blogs.reduce(( acc, cur ) => acc + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length > 0) {
        return blogs.reduce(( acc, cur ) => (cur.likes > acc.likes) ? cur : acc, blogs[0])
    }
    return null
}

const mostBlogs = (blogs) => {
    if (blogs.length > 0) {
        const counts = blogs.reduce((acc, cur) => {
            if (cur['author'] in acc) {
                acc[cur['author']] += 1
            } else {
                acc[cur['author']] = 1
            }
            return acc
        }, {})
        let authorWithMostBlogs = { 'blogs': 0 }
        for (let key in counts) {
            if (counts[key] >= authorWithMostBlogs['blogs']) {
                authorWithMostBlogs = {
                    'author': key,
                    'blogs': counts[key]
                }
            }
        }
        return authorWithMostBlogs
    }
    return null
}

const mostLikes = (blogs) => {
    if (blogs.length > 0) {
        const counts = blogs.reduce((acc, cur) => {
            if (cur['author'] in acc) {
                acc[cur['author']] += cur['likes']
            } else {
                acc[cur['author']] = cur['likes']
            }
            return acc
        }, {})
        let authorWithMostLikes = { 'likes': 0 }
        for (let key in counts) {
            if (counts[key] >= authorWithMostLikes['likes']) {
                authorWithMostLikes = {
                    'author': key,
                    'likes': counts[key]
                }
            }
        }
        return authorWithMostLikes
    }
    return null
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}