# About
A lightweight, fast, and simple neural networking library that is designed for both server-side and client-side usage. While this does currently work, it will continued to be updated when I feel like it.

# Usage
**Creating A Neuron**

```var neuronName = new Neuron(value, [connections]);```

**Creating A Layer**

```var layerName = new Layer([neurons]);```

**Creating A Network**

```var networkName = new Network(input, [hidden], output, "name");```

**Making A Network Think**

```var networkThoughts = networkName.think();```

**Creating A Brain**

```var brainName = new Brain({networks});```

**Appending A Network To The A Brain**

```brainName.grow(networkName);```

**Making A Network Inside A Brain Think**

```var networkhoughts = brainName.networks["name"].think()```

**Recieving Output**

When assigning a variable to a thought process (```.think()```), the variable will be set to the output layer of the finished thought process. The output layer contains an array of neurons whos values can be seen.

```networkThoughts.neurons```, The array of neurons in the output layer
```networkThoughts.neurons[#]```, A specific neuron in the output layer
```networkThoughts.neurons[#].value```, The value of a specific neuron in the output layer
```networkThoughts.neurons[#].connections```, The array of connections of a specific neuron in the output layer (mostly useless because connections arent needed in output neurons)

# Example

Below is an example of a brain with one neural network. Each layer within the neural network will only have one neuron, and there will be one hidden layer.

```
var neuron1 = new Neuron(0, [1, -1]);
var layer1 = new Layer([neuron1]);

var neuron2 = new Neuron(0 [-0.5, -1]);
var layer2 = new Layer([neuron2]);

var layer3 = new Layer(); // The default neurons are []
var neuron3 = new Neuron(0); // The default connections are []
layer3.neurons.push(neuron3); // Just another way of accessing the neurons in a layer

var network = new Network(layer1, [layer2], layer3, "Network 1"); // set network name to "Network 1" for easy access in the brain
var thoughts1 = network.think(); // Thinking without a brain

var brain = new Brain(); // The default for networks is []
brain.grow(network); // The proper way of appending a network
var thoughts2 =  brain.networks["Network 1"].think(); // think with a brain

```
