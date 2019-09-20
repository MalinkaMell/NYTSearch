$(document).ready(function () {

    $("#search-button").on("click", function () {

        event.preventDefault();
        $("#articles").empty();
        let getQuery = $("#search_term").val();

        let limit = $("#number_of_records").val();
        let startYear = $("#start_year").val();
        let endYear = $("#end_year").val();

        if (startYear !== "") {
            startYear = "&begin_date=" + startYear + "0101"
        }
        else { startYear = ""; }

        if (endYear !== "") {
            endYear = "&end_date=" + endYear + "1231"
        }
        else { endYear = ""; }



        let getQueryString = getQuery.split(" ").join("+");
        console.log(getQueryString)


        let queryURL =
            "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="
            + getQueryString + startYear + endYear +
            "&api-key=e5rUYLdd4pWA5sZoPOZEy4AUDjVJ9ie8"
        console.log(queryURL)

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            if (response.response.docs.length !== 0) {
                for (let i = 0; i < limit; i++) {
                    let divCard = $("<div>");
                    divCard.attr("class", "card mb-3");
                    let divRow = $("<div>");
                    divRow.attr("class", "row no-gutters");
                    let divColImg = $("<div>");
                    divColImg.attr("class", "col-md-4");
                    let img = $("<img>");
                    img.attr("width", "350px")
                    if (response.response.docs[i].multimedia.length === 0) {
                        img.attr("src", "http://via.placeholder.com/300x200");
                    }
                    else {
                        img.attr("src", "https://www.nytimes.com/" + response.response.docs[i].multimedia[0].url);
                    }
                    let colContent = $("<div>");
                    colContent.attr("class", "col-md-8");
                    let cardBody = $("<div>");
                    cardBody.attr("class", "card-body");
                    let cardTitle = $("<h5>");
                    cardTitle.attr("class", "card-title");
                    let cardText = $("<p>");
                    cardText.attr("class", "card-text");
                    let source = $("<p>");
                    source.attr("class", "card-text text-muted");
                    let pubDate = $("<p>");
                    pubDate.attr("class", "card-text");
                    let byLine = $("<p>");
                    byLine.attr("class", "card-text");
                    let url = $("<p>");
                    url.attr("class", "link");
                    divCard.append(divRow);
                    divRow.append(divColImg);
                    divRow.append(colContent);
                    divColImg.append(img);
                    colContent.append(cardBody);
                    cardBody.append(cardTitle);
                    cardBody.append(cardText);
                    cardBody.append(byLine);
                    cardBody.append(pubDate);
                    cardBody.append(source);
                    cardBody.append(url);



                    $("#articles").append(divCard);
                    cardTitle.html(response.response.docs[i].snippet);
                   // source.html(`<b>Source:</b> ${response.response.docs[i].source}`);
                    pubDate.html(`<b>Publishing date:</b> ${response.response.docs[i].pub_date}`)
                    byLine.html(`<b>By:</b> ${response.response.docs[i].byline.original}`)
                    url.html(`<a href=${response.response.docs[i].web_url} target="_blank">Got To Article</a>`)

                }
            }
            else {
                $("#articles").html("<h2>No results</h2>");
            }
        })




    })

    $("#reset-button").on("click", function () {
        $("#search_term").val("");
        $("#number_of_records").val("");
        $("#start_year").val("");
        $("#end_year").val("");

    })

    $("#clear-button").on("click", function () {
        $("#articles").empty();

    })







})