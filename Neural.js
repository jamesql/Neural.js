function htan (x) {
  
  return (Math.pow(Math.E, x)-Math.pow(Math.E, -x))/(Math.pow(Math.E, x)+Math.pow(Math.E, -x));
  
}

class Neuron {
  
  constructor (value, connections) {
    
    this.value = value || 0;
    this.connections = connections || [];
    
  }
  
}

class Layer {
  
  constructor (neurons) {
    
    this.neurons = neurons || [];
    
  }
  
}

class Network {
  
  constructor (input, hidden, output, name) {
    
    this.input = input;
    this.hidden = hidden || [];
    this.output = output;
    this.name = name || Math.random();
    
  }
  
  think () {
    
    var network = JSON.parse(JSON.stringify(this));
    var smart = false;
    var input = network.input;
    var hidden = network.hidden;
    var output = network.output;
    
    if (hidden.length > 0) {
      
      smart = true;
      
    }
    
    var i, n, x, neuron, connection, connector;
    for (i = 0; i < input.neurons.length; i ++) {
      
      neuron = input.neurons[i];
      
      for (n = 0; n < neuron.connections.length; n ++) {
        
        connection = neuron.connections[n];
        connector = hidden[0] || output || false;
        
        if (connector) {
          
          connector.neurons[n].value += connection * neuron.value;
          
        }
        
      }
      
    }
    for (i = 0; i < hidden.length; i ++) {
      
      var layer = hidden[i];
      
      for (n = 0; n < layer.neurons.length; n ++) {
        
        neuron = layer.neurons[n];
        neuron.value = htan(neuron.value);
        
        for (x = 0; x < neuron.connections.length; x ++) {
          
          connection = neuron.connections[x];
          connector = hidden[i+1] || output || false;
          
          if (connector) {
            
            connector.neurons[x].value += connection * neuron.value;
            
          }
          
        }
        
      }
      
    }
    for (i = 0; i < output.neurons.length; i ++) {
      
      neuron = output.neurons[i];
      neuron.value = htan(neuron.value);
      
    }
    
    return output;
    
  }
  
}

class Brain {
  
  constructor (networks) {
    
    this.networks = networks || {};
    
  }
  
  grow (network) {
    
    this.networks[network.name] = network;
    
  }
  
  
}
