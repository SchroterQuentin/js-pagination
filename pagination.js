function NoWrap() {
    $(".pagination li").each(function () {
        var node = $(this).find("a")
        $(node).text($(node).attr("rel"))
        $(this).show()
    })
    active_page = Math.floor($(".pagination li[class='active'] a").attr("rel"))
    last_page = Math.floor($(".pagination li").length)
    height = Math.floor($(".pagination").height())
    i_bottom = Math.floor((active_page) / 2) + 1
    i_top = Math.min(Math.floor(active_page + (last_page - active_page) / 2), last_page - 2)

    width = Math.floor($(".pagination").width())

    var seuil = 1

    count_left = $(".pagination li:first").nextUntil(".active").length
    if (count_left == last_page - 1) {
        count_left = 0
    }
    count_right = $(".pagination li.active").nextAll().length

    if (height > 40) {
        console.log(i_bottom)
        console.log($(".pagination li").get(i_bottom))
        console.log(i_top)
        console.log($(".pagination li").get(i_top))
        console.log("------------------ ")
        if (i_bottom > 1 && i_bottom < last_page - 2) {
            var replace = $(".pagination li").get(i_bottom)
            $(replace).find("a").text("...")
        }
        if (i_top < last_page - 2) {
            var replace = $(".pagination li").get(i_top)
            $(replace).find("a").text("...")
        }
        j_left = 1
        j_right = 1
        while (height > 40) {
            if (count_left > count_right) {
                if (i_bottom - j_left > 1) {
                    $(".pagination li")[i_bottom - j_left].style.display = "none"
                    count_left--
                }
                if (i_bottom + j_left < active_page - seuil) {
                    $(".pagination li")[i_bottom + j_left].style.display = "none"
                    count_left--
                }
                j_left++
            }
            else {
                if (i_top - j_right > active_page + 1) {
                    $(".pagination li")[i_top - j_right].style.display = "none"
                    count_right--
                }
                if (i_top + j_right < last_page - seuil) {
                    $(".pagination li")[i_top + j_right].style.display = "none"
                    count_right--
                }
                j_right++
            }

            height = $(".pagination").height()
            width = Math.floor($(".pagination").width())

            if (j_left + j_right > last_page) {
                return false
            }
        }
    }
}


function no_wrap(event = null, size_offset = 1, height_max = 40) {
    $(".pagination").each(function () {

        $(this).find("li").each(function () {
            var node = $(this).find("a")
            $(node).text($(node).attr("rel"))
            $(this).show()
        })

        nb_item = $(this).find("li").length
        active_item = $(this).find("li:first").nextUntil(".active").length

        // -1 because we acces an array wich start with 0
        middle_bottom_item = Math.floor(active_item / 2) + size_offset
        middle_top_item = active_item + Math.floor((nb_item - active_item) / 2) + size_offset
        active_item = active_item

        height = $(this).height()

        count_left = active_item
        count_right = nb_item - count_left

        seuil = 0


        if (height > height_max) {
            if (middle_bottom_item < active_item && middle_bottom_item > size_offset) {
                var replace = $(this).find("li").get(middle_bottom_item)
                $(replace).find("a").text("...")
            }
            if (middle_top_item > active_item && middle_top_item < nb_item - size_offset) {
                var replace = $(this).find("li").get(middle_top_item)
                $(replace).find("a").text("...")
            }

            j_left = 1
            j_right = 1

            while (height > height_max) {
                if (count_left > count_right) {
                    if (middle_bottom_item - j_left > size_offset) {
                        $(this).find("li")[middle_bottom_item - j_left].style.display = "none"
                        count_left--
                    }
                    if (middle_bottom_item + j_left < active_item - seuil) {
                        $(this).find("li")[middle_bottom_item + j_left].style.display = "none"
                        count_left--
                    }
                    j_left++
                }
                else {
                    if (middle_top_item - j_right > active_item + seuil) {
                        $(this).find("li")[middle_top_item - j_right].style.display = "none"
                        count_right--
                    }
                    if (middle_top_item + j_right < nb_item - size_offset) {
                        $(this).find("li")[middle_top_item + j_right].style.display = "none"
                        count_right--
                    }
                    j_right++
                }

                height = $(this).height()

                if (j_left + j_right > nb_item) {
                    break;
                }
            }
        }
    })
}