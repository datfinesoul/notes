function generateId() {
  return Math.floor(Math.random() * (99999 - 10000)) + 10000;
}

function Computer(name, cores) {
  function overrideId(id) {
    // private method
    machineId = id;
  }

  // privileged methods
  this.getId = function() {
    return machineId;
  }
  this.resetId = function(id) {
    overrideId(id);
  }

  // public variables
  this.name = name || 'default';
  this.cores = cores || 1;

  // private variable
  var machineId = generateId();
}
Computer.prototype.about = function () {
  // public method
  var info = {
    name: this.name, 
    cores: this.cores, 
    getId: this.getId(), 
    machineId: this.machineId   // this will come back undefined, no access
  };
  return info;
}

var a = new Computer();
console.log(a.about());

console.log('\nComputer', a);
console.log('\nComputer.name', a.name);
console.log('Computer.machineId', a.machineId);   // this will return undefined, no access
console.log('Computer.getId()', a.getId());
console.log('Computer.overrideId', a.overrideId); // this will return undefined

console.log('');
var b = new Computer('personal', 2);
console.log(b.about());

b.resetId('HACK');

console.log(b.about());

function Server(name, cores, formFactor) {
  this.getMachineId = function() {
    // we have access to the superclass's privileged methods/fields, but not the private
    return this.getId();
  }
  // call base constructor
  Computer.call(this, name, cores);
  this.formFactor = formFactor;
}
Server.prototype = new Computer();
Server.prototype.about = function() {
  // access the super class 
  var info = Computer.prototype.about.call(this);
  info.formFactor = this.formFactor;
  return info;
}

console.log();
var c = new Server('Ship', 16, '2u');
console.log(c.about());
console.log('Server.getMachineId()', c.getMachineId());
