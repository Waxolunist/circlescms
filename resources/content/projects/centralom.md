author: Christian Sterzl
time: 2010 - 2013
name: CentralOM
tags: web .net jquery javascript printing jms windows
summary: CentralOM (**C**entral **O**utput**M**anagement) is an application to monitor one or more printer queues on a windows system. A web interface enables the business to watch the progress of their printjobs, which are printed and enveloped in a central place. Furthermore handles a JMS client the printing of documents created by the companies correspondence solution.

# CentralOM

<div class="swiper-container" cc-slider>
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img src="/assets/projects/centralom/webui.png">
    </div>
    <div class="swiper-slide">
      <img src="/assets/projects/centralom/cmp.png">
    </div>
  </div>
  <div class="swiper-pagination"></div>
</div>

CentralOM (**C**entral **O**utput**M**anagement) is an application I wrote for Sympany to accompany the implementation of an enveloping machine. Until then the insurance clerks wrote, printed and enveloped the daily correspondence all by themself. The departement in charge for output management (IOM) just collected the envelopes and stamped them.

In order to be more productive and help the insurance clerks to loose less time, while doing their daily, Sympany leased an enveloping machine. The next thing to do was to print the correspondence in a central place. But it was not enough to just install a central printer queue for everybody. The documents had to be presorted for the enveloping machine for instance by pages, by supplements or by receiver. Another problem was deleting central printed documents. If a clerk printed for instance a wrong document or a document twice he must have the chance to delete the document from the queue as long as it is not printed by the central departement but is not allowed to delete any other documents.

To fulfil these requirements I designed and wrote CentralOM. The application consists of three components, as you can see in the component diagram above. There is no designated persistence layer. The printerqueue is the persistence layer.

One component is a simple windows service. It monitors the central printer queues. Every incoming printjob gets logged and paused.

The next component is the web application, written in ASP.NET MVC. It presents based on roles a view on the printerqueue with only the documents a person is allowed to see. The users can filter and sort the printjobs, delete and print them if they are allowed to. We wrote also a MS Word-Plugin to generate barcodes on the documents, which the enveloping machine can use as a hint to work more efficent, and enriches the print job with some metadata. This plugin stored the print jobs on a central network share, so the users can view at the document before they are printing or deleting it by just clicking on the printjob in the web application.

About a year after the successful invention of the application a new correspondence software has been launched. This software was connected to our enterprise service bus. To push the documents onto the printerqueue I wrote the third part of CentralOM. This part is basically a JMS client, which retrieves the documents to print, processes them and prints them using Adobe Reader.

Today, users in Sympany are printing between 500 and 3000 documents every day with CentralOM.
