

// fetch xml data from rss feed
fetch('https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml')
  .then((response) => response.text())
  .then((data) => {
    
    let parser = new DOMParser();
    let xml = parser.parseFromString(data, "application/xml");
    buildArticleList(xml);        // parsing the xml document to display article data
});



function buildArticleList(xml){

   
    
    
     // getting all title tags and storing
    let xml_title_items = xml.getElementsByTagName('title');
    let pointer =0;
    let title_items =[];
    for(let i=2; i< xml_title_items.length; i++){

         title_items[pointer]= xml_title_items[i].childNodes[0].nodeValue;
         pointer++;
    }

    // getting all description tags and storing
    let xml_desc_items = xml.getElementsByTagName('description');
    let description_items =[];
    pointer=0;
    for(let i=1; i< xml_desc_items.length; i++){

        description_items[pointer]= xml_desc_items[i].childNodes[0].nodeValue;
        pointer++;


   }

   // getting all date of publishing tags and storing
   let xml_pubdate_items = xml.getElementsByTagName('pubDate');
    let pubdate_items =[];
    pointer=0;
    for(let i=1; i< xml_pubdate_items.length; i++){

        pubdate_items[pointer]= xml_pubdate_items[i].childNodes[0].nodeValue;
        pointer++;


   }

   // getting all created by tags and storing
   let xml_creator_items = xml.getElementsByTagName('dc:creator');
    let creator_items =[];
    pointer=0;
    for(let i=0; i< xml_creator_items.length; i++){

        creator_items[pointer]= xml_creator_items[i].childNodes[0].nodeValue;
        pointer++;


   }

   // getting all image links and storing
   let xml_img_items = xml.getElementsByTagName('media:content');
   let img_items = [];

   pointer=0;

   for(let i=0; i<xml_img_items.length; i++){
      img_items[pointer] = xml_img_items[i].getAttribute('url');
      pointer++;
   }

   // getting all article links and storing

   let xml_link_items = xml.getElementsByTagName('link');
   let link_items =[];
   pointer=0;

   for(let i=2; i< xml_link_items.length; i++){
    link_items[pointer]= xml_link_items[i].childNodes[0].nodeValue;
    pointer++;
   }


   
    let list = document.getElementById('article-list');
    let navbar_date = document.getElementById('navbar-date');
    let navbar_logo = document.getElementById('navbar-logo');

    let date = xml_pubdate_items[0].childNodes[0].nodeValue;
    console.log(date);


    let ny_logo =  xml.getElementsByTagName('url');
 
    
    let img = document.createElement('img');
    img.setAttribute('src', ny_logo[0].childNodes[0].nodeValue);
    navbar_logo.append(img);
    
    navbar_date.append(date);
    
    // appending the article object to an unordered list
          for(let i=0; i< xml_creator_items.length; i++){
   
            let article_date  = document.createElement('small');
            article_date.textContent = pubdate_items[i];
            article_date.classList.add('article-date');

            let article_title = document.createElement('a');
            article_title.textContent = title_items[i];
            article_title.classList.add('article-title');
            article_title.setAttribute('href', link_items[i]);


            let article_description = document.createElement('a');
            article_description.textContent = description_items[i];
            article_description.classList.add('article-description');
            article_description.setAttribute('href', link_items[i]);


            let article_creator = document.createElement('small');
            article_creator.textContent = creator_items[i];
            article_creator.classList.add('article-creator');

            let article_img = document.createElement('img');
            article_img.classList.add('article-image');
            let value = null;
            if(img_items.length < i) value=null;
            else value =img_items[i];
            article_img.setAttribute('src',value);
           

            let article_detail = document.createElement('div');
            article_detail.classList.add('article-detail');
            article_detail.appendChild(article_date);
            article_detail.appendChild(article_title);
            article_detail.appendChild(article_description);
            article_detail.appendChild(article_creator);

            let article = document.createElement('div');
            article.classList.add('article');
            article.appendChild(article_detail);
            article.appendChild(article_img);
            let li = document.createElement('li');
            li.appendChild(article);
            list.append(li);

    
    
          }



}