const { exec } = require('@/db/mysql')
const xss = require('xss')

const getBlogList = async (author = '', keyword = '') => {
    const sql = 'select * from blogs where 1=1'
    let fields = []
    if(author){
        sql += ' and `author` like %?% '
        fields.push(author)
    }
    if(keyword) {
        sql += ' and `keyword` like %?% '
        fields.push(keyword)
    }

    return await exec(sql, fields);
}

const getBlogDetail = async (id) => {
    if(!id) return null
    const sql = 'select * from blogs where `id` = ?'
    const fileds = [id]

    const rows = await exec(sql, fileds)
    return rows.length > 0 ? rows[0] : null
}

const addBlog = async (body) => {
    const { title,content,author } = body
    const sql = `insert into blogs (title,content,author, createtime) values ('${xss(title)}','${xss(content)}','${author}', '${Date.now()}')`

    const insertData = await exec(sql)
    return insertData ? insertData.insertId : null
}

const updateBlog = async (id, body) => {
    const { title, content } = body
    let sql = `update blogs set title='${xss(title)}',content='${xss(content)}' where id='${id}'`

    const updateData = await exec(sql)
    return updateData ? updateData.affectedRows : null
}


const delBlog = async (id, username, isAdmin = 0) => {
    const sql = 'delete from blogs where `id` = ?'
    const fileds = [id]

    if(!isAdmin) {
        sql += 'and `author` = ?'
        fileds.push(username)
    }

    return await exec(sql, fileds).then(delData => {
        return delData.affectedRows
    })
}

module.exports = {
    getBlogList,
    addBlog,
    getBlogDetail,
    updateBlog,
    delBlog
}