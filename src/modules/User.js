const mongoose = require("mongoose");
const validator = require("validator");

const schemas = new mongoose.Schema(
  {
    firstName: {
      type: String,
      requried: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      requried: true,
      unique: true,
      toLowerCase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Entered Email Address Is Not Valid");
        }
      },
    },
    password: {
      type: String,
      requried: true,
    },
    gender: {
      type: String,
      requried: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value))
          throw new Error("Invalid Gender Type");
      },
    },
    imageURL: {
      type: String,
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAMFBMVEXk5ueutLfY29ypr7Ln6ere4eK8wcPU19nq7O22u77b3t/Hy83R1NazuLvN0NK5vsDaM1loAAAE90lEQVR4nO2d25LbIAxAMYiLwZf//9viOG02jWMbkCNlR2f60N2++AwIEAiqlCAIgiAIgiAIgiAIgiAIgiAIgiAIlwMAStlolz/LD0D9QdUAWO2nlNxKStMQ7Xf6BDsk148m02XM7S+9S8PX+UDQqe82GXunv0kHgp/HbZXVZ/ZfoxP0m0b5Qa/DN+iAnc2hS44hp9jbgBq6My7LiDBQf+wBYN05lbVxLOfGAT2ed8k2nab+4vfA2S72sOHb1aYik5WJZ0+DVOHC1abOhaVNjpda2MUN+GqXrvO82gbi3lrsANMxm28K5soNG0f9+U9MLS7ZZqIWeACxzSXbRDYdDZo62U2m5yIDQ6tLthmY2ECzSmbkIRMao/9OCtQiCygNk5uG2mMBcBqGR9NAw9z/xExt0rgoe4Z+QAsOy8U4chl7vEd2lj4SuzSkMa9Q97PKXHkTk4hlLFrIZJwldQGPFzJ53qRNOVFDhjpoICFN/zeoczRcmUQaNHFGdMkrGkoZiJjxv0ybhEEDHmuVeYdWBtel079JhnKiQZ5mOuPpXERGZESmVAZ7nqEdmn+TzIkqmRJG0sOAiJlo5oUm6ZZGSXXJMYY4b0bOZ0hdoKYo470MbUkADKjDGfEZOupwRpqbLSAOZ8Qho1T4TTuaoPGChngPcAFvf4Z4llGo/Yz+HBAsVj+jXZjdbbDGM/qDM4zCmTv04a/QTjVnDi556YzRNIZFw+SmOVX8f0BPPpT9BaGqiUe7KIwaLUM/xzxoXQawqZ1baF2hUZczPNOWcTKqN73RsEQjz2NeqK9uoN6T2aL2eNOQnsq+o7KCfqTckn0LqCoZBgv/LaCi9HTke8ExFMaN6TnfpC0sP+OQj+0Aw/nG6akr/w6BmE7eb0xMQ/8noLw7oeM839D/CVjvzJ6OMW5gdjNrB7D6bWczWUVznPT3sNNsXton/2Yevs3kRo6edHtD4x9j+pJI2QRCUNYP0zQN3qrwFa8z7AEPqD+lltvjOa/kX97/8StYGsDaGHPfSsnN6ysn60AwjrNzKXc4HaNir7SIRJ0tXL8+mvMyOt9/O84pTV5bxbXvLY8ZDSnlptiQ2JptlueBJm/5+QSIw9oehxpPSksbTV4xGuWWt4xcwxF6Fso+1BYLEFTq2w/PRqeB2gfAox3Qjom0u4E6m7ucwzi6FMemwng/tjE9zZmT3c9Zqn3GvIj7qBAofY3KqjN9NEl4n3rh6MwfS0QhpqLnpar4zBYBqAnjPPaQ8QMjW9C4F7N26NO10w6EhFyVvctsL1wUBPuxZrkzXWaDfY3hBCZdNQ6g1jCftbmkCLXo6UJMmxH/GgpEGpfugkvCoHsql1tVLWZXA3/p8uXYBnEYIBjG/rPBe9uV3CWDZRMYuHQdTtxg1pS3gFFbj31LvhqMyzVEc+UW7dsDFGuYN7SWpGO8kIdG4wuVYKkFnmi7YAMfyZDPYxrKuQKjgFlpeAYRpS4elfr6Z7x32BCp3FADTf3hW7i6pgmf3r04R9XUyWGtvEVVwR3a9StsKpoG/REGNCrWAZiP/eHSl8+cyI99YVKcC+Be9Eel4u4AnzTmlcIhAPvZElRKdwVZ5TH/U/x0ILv18k8KH6lllPlvUJbWsNmS2aYsaEBzbpjSS2qetUzhigbrEfaLGIuGM9aDWaZIxhneFP2XYlHzpsRFEARBEARBoOAPhEhJogo6DqQAAAAASUVORK5CYII=",
    },
    skills: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

const UserModule = mongoose.model("User", schemas);

module.exports = { UserModule };
