# brink-dev/form-react
# ---------------------------------------
tag = "brink-dev/form-react:%s =>"

# Requires
# ---------------------------------------


# Logic
# ---------------------------------------


fieldBuilder = (field, index)->
	if !field.typeForm
		return
	else if field.typeForm == "submit"
		<div key={index}>
			<label className="label-placeholder">&nbsp;</label>
			<input type="submit" value={field.value} />
		</div>
	else if field.typeForm == "select"
		<div key={index}>
			<label htmlFor={field.name}>{field.name}</label>
			<select name={field.name}>
				{
					i = 0
					field.list.map((x)->
						<option key={i++} value={x.value}>{x.name}</option>
						)
				}
			</select>
		</div>
	else if field.typeForm == "textarea"
		<div key={index}>
			<label htmlFor={field.name}>{field.name}</label>
			<textarea name={field.name} />
		</div>
	else
		<div key={index}>
			<label htmlFor={field.name}>{field.name}</label>
			<input type={field.typeForm} name={field.name} />
		</div>
f = {}
f.fieldBuilder = fieldBuilder

exports = module.exports = f