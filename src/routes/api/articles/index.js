export function get (req, res) {
  const selection = req.query.selection
  const answer = getArticles(selection)
  res.end(JSON.stringify(answer))
}

export function getArticles (selection) {
  let all = getBasicArticles()
  let articles
  if (selection === 'all') {
    articles = all
  } else if (selection === 'published') {
    articles = all.filter(e => !!e.publishedAt)
  } else if (selection === 'drafts') {
    articles = all.filter(e => !e.publishedAt)
  }

  return {
    articles: articles,
    articlesCount: articles.length
  }
}

function getBasicArticles () {
  return [
    {
      title: 'asdasd',
      slug: 'asdasd-v31tpl',
      body: 'asdsa',
      createdAt: '2019-08-07T18:31:19.415Z',
      updatedAt: '2019-08-07T18:31:19.415Z',
      publishedAt: '2019-08-07T18:31:19.415Z',
      tagList: [],
      description: 'asdasd',
      author: {
        username: 'arthurinacio',
        bio: null,
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        following: false
      },
      favorited: false,
      favoritesCount: 0
    },
    {
      title: 'Hello',
      slug: 'hello-mjgmii',
      body: 'The thing',
      createdAt: '2019-08-07T17:24:10.784Z',
      updatedAt: '2019-08-07T17:24:10.784Z',
      publishedAt: '2019-08-07T17:24:10.784Z',
      tagList: ['HELP', 'Hello'],
      description: 'Thingt',
      author: {
        username: 'damianesteban',
        bio: null,
        image: '',
        following: false
      },
      favorited: false,
      favoritesCount: 0
    },
    {
      title: 'dddd',
      slug: 'dddd-sinzio',
      body: 'dddddd',
      createdAt: '2019-08-07T16:35:41.465Z',
      updatedAt: '2019-08-07T16:35:41.465Z',
      publishedAt: '2019-08-07T16:35:41.465Z',
      tagList: ['ddddd', 'ddd'],
      description: 'ddddd',
      author: {
        username: '102938',
        bio: 'comedy star',
        image:
          'https://pbs.twimg.com/profile_images/677895045131841536/G-inExup_400x400.jpg',
        following: false
      },
      favorited: false,
      favoritesCount: 0
    },
    {
      title: 'dddd',
      slug: 'dddd-m24v4u',
      body: 'dddddd',
      createdAt: '2019-08-07T16:35:38.251Z',
      updatedAt: '2019-08-07T16:35:38.251Z',
      publishedAt: '2019-08-07T16:35:38.251Z',
      tagList: ['ddddd', 'ddd'],
      description: 'ddddd',
      author: {
        username: '102938',
        bio: 'comedy star',
        image:
          'https://pbs.twimg.com/profile_images/677895045131841536/G-inExup_400x400.jpg',
        following: false
      },
      favorited: false,
      favoritesCount: 0
    },
    {
      title: 'dddd',
      slug: 'dddd-cfwrt6',
      body: 'dddddd',
      createdAt: '2019-08-07T16:35:37.153Z',
      updatedAt: '2019-08-07T16:35:37.153Z',
      publishedAt: '2019-08-07T16:35:38.251Z',
      tagList: ['ddddd', 'ddd'],
      description: 'ddddd',
      author: {
        username: '102938',
        bio: 'comedy star',
        image:
          'https://pbs.twimg.com/profile_images/677895045131841536/G-inExup_400x400.jpg',
        following: false
      },
      favorited: false,
      favoritesCount: 0
    },
    {
      title: 'dddd',
      slug: 'dddd-xcmbz3',
      body: 'dddddd',
      createdAt: '2019-08-07T16:35:36.067Z',
      updatedAt: '2019-08-07T16:35:36.067Z',
      publishedAt: '2019-08-07T16:35:38.251Z',
      tagList: ['ddd'],
      description: 'ddddd',
      author: {
        username: '102938',
        bio: 'comedy star',
        image:
          'https://pbs.twimg.com/profile_images/677895045131841536/G-inExup_400x400.jpg',
        following: false
      },
      favorited: false,
      favoritesCount: 1
    },
    {
      title: 'dddd',
      slug: 'dddd-q3z993',
      body: 'ddddddd',
      createdAt: '2019-08-07T16:34:21.212Z',
      updatedAt: '2019-08-07T16:34:21.212Z',
      publishedAt: '2019-08-07T16:35:38.251Z',
      tagList: ['dddd', 'ddd'],
      description: 'ddddd',
      author: {
        username: '102938',
        bio: 'comedy star',
        image:
          'https://pbs.twimg.com/profile_images/677895045131841536/G-inExup_400x400.jpg',
        following: false
      },
      favorited: false,
      favoritesCount: 0
    },
    {
      title: 'dddd',
      slug: 'dddd-9hd5e2',
      body: 'ddddddd',
      createdAt: '2019-08-07T16:34:17.803Z',
      updatedAt: '2019-08-07T16:34:17.803Z',
      publishedAt: '2019-08-07T16:35:38.251Z',
      tagList: ['dddd', 'ddd'],
      description: 'ddddd',
      author: {
        username: '102938',
        bio: 'comedy star',
        image:
          'https://pbs.twimg.com/profile_images/677895045131841536/G-inExup_400x400.jpg',
        following: false
      },
      favorited: false,
      favoritesCount: 0
    },
    {
      title: 'dddd',
      slug: 'dddd-4qoc11',
      body: 'ddddddd',
      createdAt: '2019-08-07T16:34:16.855Z',
      updatedAt: '2019-08-07T16:34:16.855Z',
      tagList: ['ddd'],
      description: 'ddddd',
      author: {
        username: '102938',
        bio: 'comedy star',
        image:
          'https://pbs.twimg.com/profile_images/677895045131841536/G-inExup_400x400.jpg',
        following: false
      },
      favorited: false,
      favoritesCount: 0
    },
    {
      title: 'dddd',
      slug: 'dddd-45z96t',
      body: 'ddddddd',
      createdAt: '2019-08-07T16:34:16.135Z',
      updatedAt: '2019-08-07T16:34:16.135Z',
      tagList: ['ddd'],
      description: 'ddddd',
      author: {
        username: '102938',
        bio: 'comedy star',
        image:
          'https://pbs.twimg.com/profile_images/677895045131841536/G-inExup_400x400.jpg',
        following: false
      },
      favorited: false,
      favoritesCount: 0
    }
  ]
}
