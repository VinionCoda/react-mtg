const setSchema = new Schema({
  object: String,
  id: { type: String, require: true, unique: true },
  code: String,
  name: String,
  uri: String,
  released_at: Date,
  set_type: String,
  block_code: String,
  block: String,
  icon_svg_uri: Object,
});

const Set = mongoose.model("Set", cardSchema);

export default Set;
