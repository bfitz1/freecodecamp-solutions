const forumLatest = 'https://forum-proxy.freecodecamp.rocks/latest';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://sea1.discourse-cdn.com/freecodecamp';

const postsContainer = document.getElementById('posts-container');

const fetchData = async () => {
    try {
        const res = await fetch(forumLatest);
        const data = await res.json();
        showLatestPosts(data);
    } catch (err) {
        console.log(err)
    }
};

fetchData();

const showLatestPosts = (data) => {
    const {topic_list, users} = data;
    const {topics} = topic_list;
    
    postsContainer.innerHTML = topics.map((item) => {
        const {id, title, views, posts_count, slug, posters, category_id, bumped_at} = item;
        return `
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        `;
    }).join('');
};