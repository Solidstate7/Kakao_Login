const userService = require("../services/user.service");
const { KakaoUser } = require("../../lib/sequelize");
const jwt = require("../../lib/jwt");

exports.provideToken = async (req, res, next) => {
    try {
        // console.log(req.body);
        const {
            id,
            properties: { nickname, profile_image, thumbnail_image },
        } = req.body;
        const dto = {
            id,
            nickname,
            pfp_link: profile_image,
            pfpthumb_link: thumbnail_image,
        };
        console.log(dto);
        const result = await KakaoUser.findOrCreate({
            where: { id: dto.id },
            defaults: {
                nickname: dto.nickname,
                pfp_link: dto.nickname,
                pfpthumb_link: dto.pfpthumb_link,
            },
        });

        const tokenStr = jwt.sign(dto, "salt");
        res.send(tokenStr);

        // res.send("still testing");
    } catch (e) {
        next(e);
    }
};
