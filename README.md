# What is this?

The latest thing I'm working on while watching TV! I aim to make ita version of Mille Bourne, the old french game that was popular in the 70s.

# Setup

## Cassandra

Cassandra was a nightmare to get running locally on macOS. I don't think it's because I'm on an M1 Mac. As of January 2021, the stable version of Cassandra only supports Java 8. That's all well and good but it barfs on the latest version of Java 8. Is it my fault somehow? Maybe. My solution was as follows:

1. I got the Cassandra 4 beta from their website
2. I plopped it in a folder called `external` (which is I told git to ignore).
3. I brew installed java 11.
4. I created a little run script in `external` that points JAVA_HOME to Java 11 and fires up Cassandra

## The rest

`npm i`

`npm start`
