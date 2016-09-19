
function no_wrap(event = null, size_offset = 1, height_max = 40, seuil = 0) {
    $(".pagination").each(function () {

        $(this).find("li").each(function () {
            var node = $(this).find("a")
            $(node).text($(node).attr("rel"))
            $(this).show()
        })

        nb_item = $(this).find("li").length

        // +1 because we start at 1
        active_item = $(this).find("li:first").nextUntil(".active").length + 1

        middle_bottom_item = Math.floor(active_item / 2)
        middle_top_item = active_item + Math.floor((nb_item - active_item) / 2)

        height = $(this).height()

        count_left = active_item + 1
        count_right = nb_item - count_left

        wrap_left = false
        wrap_right = false


        if (height > height_max) {
            if (middle_bottom_item < active_item && middle_bottom_item > size_offset) {
                var replace = $(this).find("li").get(middle_bottom_item)
                $(replace).find("a").text("...")
                wrap_left = true
            }
            if (middle_top_item > active_item && middle_top_item < nb_item - size_offset) {
                var replace = $(this).find("li").get(middle_top_item)
                $(replace).find("a").text("...")
                wrap_right = true
            }

            j_left = 1
            j_right = 1

            while (height > height_max) {
                if (count_left > count_right) {
                    if (middle_bottom_item - j_left > size_offset && wrap_left) {
                        $(this).find("li")[middle_bottom_item - j_left].style.display = "none"
                        count_left--
                    }
                    if (middle_bottom_item + j_left < active_item - seuil && wrap_left) {
                        $(this).find("li")[middle_bottom_item + j_left].style.display = "none"
                        count_left--
                    }
                    j_left++
                }
                else {
                    if (middle_top_item - j_right > active_item + seuil && wrap_right) {
                        $(this).find("li")[middle_top_item - j_right].style.display = "none"
                        count_right--
                    }
                    if (middle_top_item + j_right < nb_item - 2 * size_offset && wrap_right) {
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

            // replace '...' by the default value if the item is between two items displayed
            if (middle_bottom_item < active_item && middle_bottom_item > size_offset) {
                if (middle_bottom_item - 1 >= size_offset && middle_bottom_item + 1 < nb_item){
                    if (
                        $(this).find("li").get(middle_bottom_item - 1).style.display != 'none'
                        &&
                        $(this).find("li").get(middle_bottom_item + 1).style.display != 'none'
                        ){
                        var item_tmp = $(this).find("li").get(middle_bottom_item)
                        var link_a = $(item_tmp).find('a')
                        $(link_a).text($(link_a).attr("rel"))
                    }
                }
            }
            if (middle_top_item > active_item && middle_top_item < nb_item - size_offset) {
                if (middle_top_item - 1 >= size_offset && middle_top_item + 1 < nb_item){
                    if (
                        $(this).find("li").get(middle_top_item - 1).style.display != 'none'
                        &&
                        $(this).find("li").get(middle_top_item + 1).style.display != 'none'
                        ){
                        var item_tmp = $(this).find("li").get(middle_top_item)
                        var link_a = $(item_tmp).find('a')
                        $(link_a).text($(link_a).attr("rel"))
                    }
                }
            }
        }
    })
}