const { exec } = require('@/db/mysql')

const getBlogList = async (query) => {
    const { author = '', keyword = '' } = query;
    const sql = 'select * from blogs where 1=1'
    if(author) {
        sql += ` and author = '${author}' `
    }
    if(keyword) {
        sql += ` and title like '%${keyword}%' and content like '%${keyword}%' `
    }
    return exec(sql)
}

const getBlogDetail = (query) => {
    const { id } = query;
    const sql = `select * from blogs where id = ${id}`
    console.log('file: blog.js ~ line 18 ~ getBlogDetail ~ sql', sql);
    return exec(sql).then(rows => {
        console.log('rows && rows[0]', rows && rows[0])
        return rows && rows[0]
    })
}

const addBlog = (params) => {
    const {author = '', title = '', content = '' }  = params;
    const createTime = Date.now()
    const sql = `
        insert into blogs(title, content, createtime, author) 
                    values('${title}', '${content}', '${createTime}', '${author}')
    `
    return exec(sql)
}

const updateBlog = (params) => {
    const { id = '', title = '', content = '' } = params;
    const sql = `
        update blogs set title = '${title}', content = '${content}' where id = '${id}'
    `
    return exec(sql)
}

const delBlog = (param) => {
    const sql = `delete from blogs where id = ${param && param.id} `
    return exec(sql)
}

module.exports = {
    getBlogList,
    getBlogDetail,
    addBlog,
    updateBlog,
    delBlog
}