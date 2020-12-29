const { exec } = require('../db/mysql')

const getBlogList = (params) => {
    if(!params) return null;
    const { title, content, author } = params;
    const sql = 'select * from blogs where 1=1 '
    if(title){
        sql += ' or `title` like %?% '
    }
    if(content) {
        sql += ' or `content` like %?% '
    }
    if(author) {
        sql += ' or `author` like %?% '
    }
    return exec(sql, [title, content, author]);
}
const addBlog = () => {

}

const getBlogDetail = (id) => {
    const sql = 'select * from blogs where `id` = ?'
    const fileds = [id]
    return exec(sql, fileds).then(fields => fields[0])
}

module.exports = {
    getBlogList,
    addBlog,
    getBlogDetail
}