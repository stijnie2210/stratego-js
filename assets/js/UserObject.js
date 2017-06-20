function User(json) {
	this.id = json.id
	this.name = json.name
}

User.prototype.render = function() {
	var render = '<div class="card">'
	render += '<div class="card-content">'
	render += '<h1 class="title info-header">My info</h1>'
	render += '</div></div><br>'
	render += '<div class="card">'
	render += '<header class="card-header"><p class="card-header-title">User Info</p></header>'
	render += '<div class="card-content">'
	render += '<p>id: ' + this.id + '</p>'
	render += '<p>Name: ' + this.name + '</p><br>'
	render += '<h2 class="subtitle">Other API key:</h2><input class="input api-key" type="text""><br><br>'
	render += '<button class="button is-success submit-token">Submit</button>'
	render += '</div></div>'

	return render
}