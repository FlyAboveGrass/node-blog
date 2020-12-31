const { exec } = require('@/db/mysql')

const getBlogList = (params) => {
    if(!params) return null;
    const { title, content, author } = params;
    const sql = 'select * from blogs where 1=1 '
    let fields = []
    if(title){
        sql += ' or `title` like %?% '
        fields.push(title)
    }
    if(content) {
        sql += ' or `content` like %?% '
        fields.push(content)
    }
    if(author) {
        sql += ' or `author` like %?% '
        fields.push(author)
    }
    return exec(sql, fields);
}
const addBlog = () => {

}

const getBlogDetail = (id) => {
    if(!id) return null
    const sql = 'select * from blogs where `id` = ?'
    const fileds = [id]
    return exec(sql, fileds).then(fields => fields[0])
}

module.exports = {
    getBlogList,
    addBlog,
    getBlogDetail
}