export class Post {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.likes = data.likes
    this.createdAt = this.computedDate(new Date().valueOf() - new Date(data.createdAt).valueOf())
  }

  computedDate(date) {
    let template = ''
    let leftOver = date
    const days = Math.floor(leftOver / (24 * 60 * 60 * 1000))
    leftOver -= days * (24 * 60 * 60 * 1000)
    const hours = Math.floor(leftOver / (60 * 60 * 1000))
    leftOver -= hours * 3600000
    const minutes = Math.floor(leftOver / (60 * 1000))
    if (days) {
      template += `${days}d `
    }
    if (hours) {
      template += `${hours}h `
    }
    template += `${minutes}m`
    return template
  }
}