const {
    ORM: { KakaoUser },
    JWT: { jwt, SALT },
} = require("../../lib");

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

        // console.log(dto);

        await KakaoUser.findOrCreate({
            where: { id: dto.id },
            defaults: {
                nickname: dto.nickname,
                pfp_link: dto.pfp_link,
                pfpthumb_link: dto.pfpthumb_link,
            },
        });

        const tokenStr = jwt.sign(dto, SALT);
        res.send(tokenStr);
    } catch (e) {
        next(e);
    }
};
