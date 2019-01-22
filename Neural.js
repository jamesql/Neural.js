function htan (x) {
  
  return (Math.E^x - Math.E^-x) / (Math.E^x + Math.E^-x);

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
    var input = network.input;
    var hidden = network.hidden;
    var output = network.output;
    
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

function emptyNetwork (inputNeurons, hiddenLayers, hiddenNeurons, outputNeurons, name) {
  
  var inputLayer = new Layer();
  var hiddenLayerStore = [];
  var outputLayer = new Layer();
  
  var i, n;
  for (i = 0; i < inputNeurons; i ++) {
    
    var inputNeuron = new Neuron(0);
    
    for (n = 0; n < hiddenNeurons; n ++) {
      
      inputNeuron.connections.push(0);
      
    }
    
    inputLayer.neurons.push(inputNeuron);
    
  }
  for (i = 0; i < hiddenLayers; i ++) {
    
    hiddenLayer = new Layer();
    
    for (n = 0; n < hiddenNeurons; n ++) {
      
      var hiddenNeuron = new Neuron(0);
      
      for (var x = 0; x < hiddenNeurons; x ++) {
        
        hiddenNeuron.connections.push(0);
        
      }
      
      hiddenLayer.neurons.push(hiddenNeuron);
      
    }
    
    hiddenLayerStore.push(hiddenLayer);
  }
  
  for (i = 0; i < hiddenNeurons; i ++) {
    
    hiddenLayerStore[hiddenLayers-1].neurons[i].connections = [];
    
    for (n = 0; n < outputNeurons; n ++) {
      
      hiddenLayerStore[hiddenLayers-1].neurons[i].connections.push(0);
      
    }
    
  }
  
  for (i = 0; i < outputNeurons; i ++) {
    
    var outputNeuron = new Neuron(0);
    outputLayer.neurons.push(outputNeuron);
    
  }
  
  var network = new Network(inputLayer, hiddenLayerStore, outputLayer, name);
  return network;
  
}

function connectedNetwork (inputNeurons, hiddenLayers, hiddenNeurons, outputNeurons, name) {
  
  var inputLayer = new Layer();
  var hiddenLayerStore = [];
  var outputLayer = new Layer();
  
  var i, n;
  for (i = 0; i < inputNeurons; i ++) {
    
    var inputNeuron = new Neuron(0);
    
    for (n = 0; n < hiddenNeurons; n ++) {
      
      inputNeuron.connections.push(1);
      
    }
    
    inputLayer.neurons.push(inputNeuron);
    
  }
  for (i = 0; i < hiddenLayers; i ++) {
    
    hiddenLayer = new Layer();
    
    for (n = 0; n < hiddenNeurons; n ++) {
      
      var hiddenNeuron = new Neuron(0);
      
      for (var x = 0; x < hiddenNeurons; x ++) {
        
        hiddenNeuron.connections.push(1);
        
      }
      
      hiddenLayer.neurons.push(hiddenNeuron);
      
    }
    
    hiddenLayerStore.push(hiddenLayer);
  }
  
  for (i = 0; i < hiddenNeurons; i ++) {
    
    hiddenLayerStore[hiddenLayers-1].neurons[i].connections = [];
    
    for (n = 0; n < outputNeurons; n ++) {
      
      hiddenLayerStore[hiddenLayers-1].neurons[i].connections.push(1);
      
    }
    
  }
  
  for (i = 0; i < outputNeurons; i ++) {
    
    var outputNeuron = new Neuron(0);
    outputLayer.neurons.push(outputNeuron);
    
  }
  
  var network = new Network(inputLayer, hiddenLayerStore, outputLayer, name);
  return network;
  
}
