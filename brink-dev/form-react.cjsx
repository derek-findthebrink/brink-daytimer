# brink-dev/form-react
# ---------------------------------------
tag = "brink-dev/form-react:%s =>"

# Requires
# ---------------------------------------


# Logic
# ---------------------------------------


fieldBuilder = (field)->
	if !field.typeForm
		return
	else if field.typeForm == "submit"
		<div>
			<label className="label-placeholder">&nbsp;</label>
			<input type="submit" value={field.value} />
		</div>
	else if field.typeForm == "select"
		<div>
			<label htmlFor={field.name}>{field.name}</label>
			<select name={field.name}>
				{
					field.list.map((x)->
						<option value={x.value}>{x.name}</option>
						)
				}
			</select>
		</div>
	else if field.typeForm == "textarea"
		<div>
			<label htmlFor={field.name}>{field.name}</label>
			<textarea name={field.name} />
		</div>
	else
		<div>
			<label htmlFor={field.name}>{field.name}</label>
			<input type={field.typeForm} name={field.name} />
		</div>
f = {}
f.fieldBuilder = fieldBuilder

exports = module.exports = f