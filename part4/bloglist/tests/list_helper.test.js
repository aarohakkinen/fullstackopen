const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
    const result = listHelper.dummy([])
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('of list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(helper.oneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated correctly', () => {
        const result = listHelper.totalLikes(helper.threeBlogs)
        expect(result).toBe(15)
    })
})

describe('favorite blog', () => {
    test('of empty list is null', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual(null)
    })

    test('of a single item list has only one blog', () => {
        const result = listHelper.favoriteBlog(helper.oneBlog)
        expect(result).toEqual(helper.oneBlog[0])
    })

    test('of a bigger list is the blog with most likes', () => {
        const result = listHelper.favoriteBlog(helper.threeBlogs)
        expect(result).toEqual(helper.threeBlogs[2])
    })
})

describe('most blogs', () => {
    test('of empty list is null', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual(null)
    })

    test('of a single item list has the correct author with correct amount', () => {
        const result = listHelper.mostBlogs(helper.oneBlog)
        expect(result).toEqual(
            {
                'author': 'Mikael Kosola',
                'blogs': 1
            }
        )
    })

    test('of a bigger list has the correct author with correct amount', () => {
        const result = listHelper.mostBlogs(helper.threeBlogs)
        expect(result).toEqual(
            {
                'author': 'Tero Pekkanen',
                'blogs': 2
            }
        )
    })
})

describe('most likes', () => {
    test('of empty list is null', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual(null)
    })

    test('of a single item list has the correct author with correct amount', () => {
        const result = listHelper.mostLikes(helper.oneBlog)
        expect(result).toEqual(
            {
                'author': 'Mikael Kosola',
                'likes': 5
            }
        )
    })

    test('of a bigger list has the correct author with correct amount', () => {
        const result = listHelper.mostLikes(helper.threeBlogs)
        expect(result).toEqual(
            {
                'author': 'Tero Pekkanen',
                'likes': 10
            }
        )
    })
})
