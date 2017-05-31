const Model = require('./main')

const time  = () => {
    const d = new Date()
    const month = d.getMonth() + 1
    const date = d.getDate()
    const hour = d.getHours()
    const minute = d.getMinutes()
    const s = `${month}/${date} ${hour}:${minute}`
    return s
}

class Todo extends Model {
    constructor(form={}) {
        super()
        this.id = form.id
        this.title = form.title || ''
        this.completed = form.completed || false
        this.user_id = form.user_id
        this.ct = form.ct || time()
        this.ut = form.ut || time()
    }

    static update(form) {
        console.log('debug form', form)
        const id = Number(form.id)
        const t = this.get(id)
        t.title = form.title
        t.ut = time()
        // 保存之后就可以将更新之后的 todo 写入到数据库中了
        t.save()
    }

    static complete(id, completed) {
        const t = Todo.get(id)
        t.completed = completed
        t.save()
        return t
    }
}

if (require.main === module) {
    test()
}

module.exports = Todo