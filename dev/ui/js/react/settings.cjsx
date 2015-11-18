# react/settings
# ---------------------------------------
tag = "react/settings:%s =>"

# Requires
# ---------------------------------------


# Logic
# ---------------------------------------

s = {}


Settings = React.createClass({
	getInitialState: ->
		return {
			categories: []
			types: []
		}
	componentDidMount: ->
		setState = =>
			categories = app.c.categories.toJSON()
			types = app.c.types.toJSON()
			this.setState({
				categories: categories
				types: types
				})
		setState()
		app.on("types categories", setState)
	render: ->
		<div className="settings">
			<h2>Settings</h2>
			<Category categories={this.state.categories} />
			<Types types={this.state.types} />
		</div>
	})

Category = React.createClass({
	render: ->
		console.log(tag, "category", this.props.categories)
		<div>
			<h2>Categories</h2>
			<ul>
				{
					this.props.categories.map((x, i)->
						<CategoryItem category={x} key={i} />
						)
				}
			</ul>
		</div>
	})

CategoryItem = React.createClass({
	render: ->
		category = this.props.category
		<li className="category-item">
			<div className="edit">
				&nbsp;
			</div>
			<div className="details">
				<h3>{category.title}</h3>
			</div>
			<app.v.Menu.Main type="category" target={category} />
		</li>
	})

Types = React.createClass({
	render: ->
		types = this.props.types
		console.log(types)
		<div>
			<h2>Types</h2>
			<ul>
				{
					types.map((x, i)->
						<TypeItem type={x} key={i} />
						)
				}
			</ul>
		</div>
	})

TypeItem = React.createClass({
	render: ->
		type = this.props.type
		<li className="type-item">
			<div className="edit">

			</div>
			<div className="details">
				{type.title}
			</div>
			<app.v.Menu.Main type="type" target={type} />
		</li>
	})

s.Main = Settings

exports = module.exports = s