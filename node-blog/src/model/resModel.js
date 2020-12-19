class BasicModel {
    constructor(data, message) {
        if(typeof(data) === 'string') {
            this.data = null
            this.message = data
        }
        this.data = data
        this.message = message
    }
}

class SuccessModel extends BasicModel {
    constructor(data, message) {
        super(data, message)
        this.code = 0
    }
}

class ErrorModel extends BasicModel {
    constructor(data, message) {
        super(data, message)
        this.code = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}