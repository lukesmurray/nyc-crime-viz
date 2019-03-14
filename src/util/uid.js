export default function(name) {
  return new Id(name);
}

function Id(id) {
  this.id = id;
  this.href = window.location.href + "#" + id;
}

Id.prototype.toString = function() {
  return "url(" + this.href + ")";
};
