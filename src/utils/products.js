const products = [
  {
    id: 1,
    name: "Nón Lux Cầu Vồng",
    price: 400000,
    image: "../../../public/hat.webp",
    tag: "hat",
    size: false,
    description:
      "Nón Lux Cầu Vồng nổi bật với họa tiết Lux cùng hiệu ứng cầu vồng thêu sắc nét, thể hiện cá tính tươi trẻ và nổi bật. Phù hợp cho cả nam và nữ, chiếc nón không chỉ là phụ kiện thời trang mà còn thể hiện phong cách riêng biệt. Chất liệu cao cấp, thoáng khí, thích hợp khi đi chơi, dạo phố hay du lịch.",
  },
  {
    id: 2,
    name: "Nón Teemo",
    price: 400000,
    image: "../../../public/teemohat.webp",
    tag: "hat",
    size: false,
    description:
      "Nón Teemo dễ thương với tai gấu đặc trưng và logo Teemo thêu nổi bật. Chiếc nón là lựa chọn hoàn hảo cho các fan của vị tướng Teemo tinh nghịch. Kiểu dáng unisex, chất liệu mềm mại, phù hợp sử dụng hàng ngày hoặc khi tham gia sự kiện cosplay, cộng đồng Liên Minh Huyền Thoại.",
  },
  {
    id: 3,
    name: "Nón Poro",
    price: 400000,
    image: "../../../public/porohat.webp",
    tag: "hat",
    size: false,
    description:
      "Nón Poro mang thiết kế dễ thương lấy cảm hứng từ sinh vật huyền thoại trong LMHT. Với phần tai vểnh đáng yêu và sắc trắng nổi bật, sản phẩm giúp bạn trở nên nổi bật trong mọi dịp. Thoáng mát, nhẹ nhàng, phù hợp đi chơi, tặng bạn bè hoặc fan cuồng Poro.",
  },
  {
    id: 4,
    name: "Nón Beemo",
    price: 400000,
    image: "../../../public/beemohat.webp",
    tag: "hat",
    size: false,
    description:
      "Nón Beemo được thiết kế từ cảm hứng Teemo phiên bản ong, với màu vàng đen đặc trưng cùng đôi râu nhỏ phía trên. Dành cho các tín đồ yêu thích sự nổi bật và hài hước. Chất liệu nỉ mềm mại, thích hợp dùng trong các buổi offline, lễ hội hoặc làm quà tặng độc đáo.",
  },
  {
    id: 5,
    name: "Nón Tibbers",
    price: 400000,
    image: "../../../public/tibbershat.webp",
    tag: "hat",
    size: false,
    description:
      "Nón Tibbers mô phỏng chú gấu bông quen thuộc của Annie với kiểu dáng dễ thương và lớp lông mềm mại. Thiết kế độc đáo, phù hợp cho những ai yêu thích những nhân vật đáng yêu. Phụ kiện hoàn hảo cho những ngày lạnh hoặc buổi chụp ảnh theo chủ đề LMHT.",
  },
  {
    id: 6,
    name: "Nón Kindred Sói và Cừu",
    price: 400000,
    image: "../../../public/kindredhat.webp",
    tag: "hat",
    size: false,
    description:
      "Nón Kindred được thiết kế tinh xảo với hình ảnh Sói và Cừu – biểu tượng của cái chết và sự sống. Chiếc nón mang phong cách ma mị và huyền bí, cực kỳ phù hợp với fan yêu thích những tướng LMHT sâu sắc. Là món phụ kiện ấn tượng khi tham gia sự kiện cosplay hoặc gaming.",
  },
  {
    id: 7,
    name: "Nón Sett HeartSteal",
    price: 400000,
    image: "../../../public/setthat.webp",
    tag: "hat",
    size: false,
    description:
      "Nón Sett HeartSteal lấy cảm hứng từ ngoại hình mạnh mẽ và cá tính của Sett trong trang phục Heartsteel. Với màu sắc thời trang, logo Sett nổi bật và form nón thể thao, đây là phụ kiện lý tưởng để thể hiện phong cách chất chơi của bạn.",
  },
  {
    id: 8,
    name: "Mô Hình Teemo Hoa Linh Lục Địa",
    price: 400000,
    image: "../../../public/teemofigure.webp",
    tag: "figure",
    size: false,
    description:
      "Mô hình Teemo phiên bản Hoa Linh Lục Địa được chế tác tinh xảo với màu sắc rực rỡ, mang thần thái sống động của nhân vật trong game. Phù hợp để trưng bày tại bàn học, kệ sách hay không gian làm việc. Một món quà tuyệt vời cho fan của Teemo.",
  },
  {
    id: 9,
    name: "Mô Hình Tahmn Kench Thần Tài",
    price: 400000,
    image: "../../../public/tahmfigure.webp",
    tag: "figure",
    size: false,
    description:
      "Tahm Kench phiên bản Thần Tài với tạo hình độc đáo và màu sắc may mắn. Mô hình mang lại cảm giác vui vẻ và thịnh vượng, phù hợp đặt ở bàn làm việc, góc học tập hay làm quà tặng đầu năm mới cho game thủ yêu thích LMHT.",
  },
  {
    id: 10,
    name: "Mô Hình Lux Sứ Thanh Hoa",
    price: 400000,
    image: "../../../public/figurelux.webp",
    tag: "figure",
    size: false,
    description:
      "Mô hình Lux trong trang phục Sứ Thanh Hoa mang phong cách Á Đông nhẹ nhàng nhưng không kém phần quyền lực. Từng chi tiết đều được làm tỉ mỉ, tạo cảm giác như nhân vật bước ra từ trò chơi. Rất thích hợp sưu tầm hoặc làm quà tặng đặc biệt.",
  },
  {
    id: 11,
    name: "Mô Hình Yone",
    price: 400000,
    image: "../../../public/yonefigure.webp",
    tag: "figure",
    size: false,
    description:
      "Mô hình Yone được khắc họa với hai thanh kiếm đặc trưng và biểu cảm đầy nội lực. Phù hợp với những fan của các tướng có nội tâm phức tạp, sâu sắc. Sản phẩm có đế đứng vững chắc, dễ dàng trưng bày ở mọi nơi như bàn làm việc hay góc sưu tầm game.",
  },
  {
    id: 12,
    name: "Mô Hình Sylas",
    price: 400000,
    image: "../../../public/sylasfigure.webp",
    tag: "figure",
    size: false,
    description:
      "Sylas – Kẻ Phá Xiềng với mô hình thể hiện vẻ mạnh mẽ, cơ bắp và sự phẫn nộ nổi bật. Là lựa chọn lý tưởng cho người hâm mộ những tướng nổi loạn, mạnh mẽ. Từng chi tiết xiềng xích, gương mặt được tái hiện rõ nét và sống động.",
  },
  {
    id: 13,
    name: "Mô Hình Twisted Fate",
    price: 400000,
    image: "../../../public/tffigure.webp",
    tag: "figure",
    size: false,
    description:
      "Mô hình Twisted Fate với bộ bài và áo choàng dài mang phong cách cao bồi phép thuật đầy cuốn hút. Chi tiết mô phỏng sắc nét tạo nên một sản phẩm tuyệt vời cho người hâm mộ yêu thích nhân vật phong cách và lịch lãm này.",
  },
  {
    id: 14,
    name: "Áo Thun Sivir Giao Pizza",
    price: 400000,
    image: "../../../public/ao1.webp",
    tag: "tee",
    size: true,
    description:
      "Áo thun Sivir Giao Pizza mang thiết kế hài hước, trẻ trung với hình ảnh Sivir đang giao bánh pizza. Chất liệu cotton 100%, mềm mại, thoáng mát, thích hợp mặc thường ngày. Mẫu áo lý tưởng cho game thủ hoặc fan của Sivir.",
  },
  {
    id: 15,
    name: "Áo Thun Kindred Hoa Linh Lục Địa",
    price: 400000,
    image: "../../../public/ao2.webp",
    tag: "tee",
    size: true,
    description:
      "Áo thun Kindred phiên bản Hoa Linh Lục Địa mang đậm phong cách nghệ thuật với hình in đẹp mắt. Sản phẩm được thiết kế unisex, form rộng, dễ phối đồ. Phù hợp đi chơi, học tập, tụ họp bạn bè hoặc làm quà tặng cho người yêu thích LMHT.",
  },
  {
    id: 16,
    name: "Áo Thun Teemo Tiểu Quỷ",
    price: 400000,
    image: "../../../public/ao3.webp",
    tag: "tee",
    size: true,
    description:
      "Áo thun in hình Teemo phiên bản Tiểu Quỷ độc đáo, cá tính và mang màu sắc hài hước. Chất vải cotton co giãn nhẹ, form áo năng động, thích hợp cho sinh hoạt hàng ngày hoặc sự kiện cosplay, meetup cộng đồng game thủ.",
  },
  {
    id: 17,
    name: "Áo Thun Siêu Phẩm Lucian",
    price: 400000,
    image: "../../../public/ao4.webp",
    tag: "tee",
    size: true,
    description:
      "Thiết kế áo thun Lucian Siêu Phẩm với phong cách cyberpunk hiện đại và đậm chất chiến binh. Hình in chất lượng cao không bong tróc, đường may chắc chắn. Lựa chọn hoàn hảo cho những ai đam mê LMHT và thời trang đường phố.",
  },
  {
    id: 18,
    name: "Áo Khoác Biệt Đội Siêu Thú",
    price: 400000,
    image: "../../../public/ao5.webp",
    tag: "jacket",
    size: true,
    description:
      "Áo khoác Biệt Đội Siêu Thú với họa tiết thú vị, màu sắc nổi bật. Form áo bomber năng động, có lót trong giữ ấm tốt, phù hợp đi học, đi chơi hoặc dạo phố. Là lựa chọn cực chất cho mùa đông và các fan LMHT cá tính.",
  },
  {
    id: 19,
    name: "Áo Khoác Thresh Hoa Linh Lục Địa",
    price: 400000,
    image: "../../../public/ao6.webp",
    tag: "jacket",
    size: true,
    description:
      "Áo khoác Thresh phiên bản Hoa Linh Lục Địa mang vẻ đẹp ma mị và đầy nghệ thuật. Với chất vải dày dặn, đường nét in nổi bật, đây là chiếc áo khoác lý tưởng cho mùa lạnh hoặc để thể hiện cá tính qua thời trang gaming.",
  },
];

export default products;
