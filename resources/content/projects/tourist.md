author: Christian Sterzl
time: 2012 - 2013
name: Tourist Subito
tags: web mobile jee java vaadin gwt jpa ejb guice guava saferpay maven jaxb
site: http://tourist.sympany.ch
summary: Tourist Subito is a webapplication to contract a travel insurance fast and uncomplicated, which I have designed and written for Sympany.

<div class="flex-container">
<div class="flexslider">
  <ul class="slides">
    <li>
      <img src="/assets/projects/tourist/tourist-desktop.png" />
    </li>
    <li>
      <img src="/assets/projects/tourist/tourist-admin.png" />
    </li>
    <li>
      <img src="/assets/projects/tourist/tourist-mobile.png" />
    </li>
    <li>
      <img src="/assets/projects/tourist/tourist-mobile2.png" />
    </li>
  </ul>
</div>
</div>
<script type="text/javascript">
$('.flexslider').flexslider();
</script>

# Tourist Subito

Tourist Subito is a webapplication to contract a travel insurance fast and uncomplicated, which I have designed and written for Sympany.

The project started in august 2012 and went live with the first release in march 2013. I worked on it as architect and main developer together with another developer and designer.

The goals were to replace the outdated current solution and embedd the application in the new infrastructure, we've built as part of the [portal project](/cc/projects/extranet-sympany).

At the beginning of the project we decided to base the application on Vaadin 7 and JEE5. Vaadin 7 was at this moment still in alpha, but we took the risk considering the long term advantages of developing against the latest features. During the development we invested just a minimum time for upgrading the vaadin versions as they saw the light of the day, which proofed us, that we met the right decision.

After going live we had some time left and implemented a mobile version with Vaadin Touchkit in about three weeks. This version was working, but did not go live until now, because the overall mobile strategy of Sympany was just not yet finished.

This web application is also the prototype for other public web applications in Sympany. It's diverse components such as E-Mail handling, PDF generation, dependency injection, etc. and its architecture as a whole are highly reusable.
