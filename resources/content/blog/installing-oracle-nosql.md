author: Christian Sterzl
date: 2013-09-02
title: Installing Oracle NoSQL
tags: oracle nosql linux

# Installing Oracle NoSQL

For some time now are various nosql databases on my radar. I played with CouchDB, read about Apache Cassandra and MongoDB. Also Redis is on my planned feature list for my website. And last week I started reading about oracles interpretation of nosql.

The best source for information about Oracle NoSQL is its homepage: http://www.oracle.com/technetwork/products/nosqldb/overview/index.html

Oracles NoSQL database is a classical key-value store with a lot of features regarding high availability. The documentation is very detailed as usual. The NoSQL database comes in two flavors: Enterprise Edition and Community Edition.

The database supports every system, java runs on. It requires at least a jre 6. I installed the database with jre 1.7 on an Ubuntu 13.04 server running in a Virtualbox VM. 

First, download the community edition of the database. I downloaded the latest version 12.1.2.1.8. After that I extracted the file to `/opt` and set a symlink:

```bash
cd /opt
sudo ln -s kv-2.1.8 kv
```

I wanted to run the database with its own user. Thus I created first the system user nosql:

```bash
useradd -r -s /usr/sbin/nologin -d /var/kv nosql
```

Then I created the future data directory `/var/kv`.

The details of the following steps are explained in the resources of the homepage of Oracle NoSQL. I'll keep it short (my hostname is `ubuntu` by the way):

**Create the config**:

```bash
sudo -u nosql java -jar /opt/kv/lib/kvstore.jar makebootconfig -root /var/kv/kvroot -port 5000 -admin 5001 -host ubuntu -harange 5010,5020 -capacity 1 -num_cpus 0 -memory_mb 0
```

**Start the server**:

```bash
sudo -u nosql java -jar /opt/kv/lib/kvstore.jar start -root /var/kv/kvroot &
```

**Test if the server is running**:

```bash
sudo -u nosql jps -m
java -jar /opt/kv/lib/kvstore.jar ping -port 5000 -host ubuntu
```

**Start the admin cli**:

```bash
sudo -u nosql java -jar /opt/kv/lib/kvstore.jar runadmin -port 5000 -host ubuntu
```

**Configure the server**:

```bash
kv-> configure -name mystore
kv-> plan deploy-datacenter -name "VM-1" -rf 3 -wait
kv-> plan deploy-sn -dc dc1 -host ubuntu -port 5000 -wait
kv-> plan deploy-admin -sn sn1 -port 5001 -wait 
kv-> pool create -name VMPool
kv-> pool join -name VMPool -sn sn1
```

If everything was successful you can see the result in the admin web console.

<img src="/assets/blog/adminconsole.png" alt="Admin Web Console" width="80%"/>

Now you can start playing around with Oracles NoSQL storage solution. A good start are the examples delivered together with the community edition.
