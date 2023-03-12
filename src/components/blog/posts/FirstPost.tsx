import { Post } from "../Post";

export const FirstPost = () => {
  return (
    <Post>
      <div>
        <h1>Blog post March ‘23</h1>
        Desine.io enables individuals to create a non-fungible token (NFT)
        associated with a 3D design model. This novel use of NFTs could
        potentially create a range of new use cases for the technology as well
        as bring new users to the space. In this post I wanted to discuss some
        of the benefits and compromises of such a technology. NFTs have been on
        somewhat of a rollercoaster since their creation. Typically associated
        with 2D art, animation and music, NFTs enable digital ownership and
        verification of an asset via blockchain technology, promising to
        revolutionise the way that such assets are sold and traded. This has led
        to an entirely new marketplace for creators to monetise their work and
        has seen incredible value being created in the space. The accessibility,
        speed and efficiency of the digital marketplace has enabled greater
        numbers of people to take part, increased tradability of assets and led
        to sharply increasing, and decreasing, values of assets. Like any new
        technology, the application of NFTs is still finding its place and it is
        hoped that the volatility that early adopters are facing will stabalise
        over time.
        <h2>The opportunity of NFTs digital 3D assets</h2>
        At Desine.io our goal is to push the application of digital assets into
        the 3D digital realm. Allowing individuals to create, trade and license
        3D digital models. Digital modeling is considered the norm for the
        design and creation of any digital and physical world 3D object. Almost
        every designer of virtual, industrial, mechanical and consumer products
        will create digital models (often referred to as computer aided design,
        CAD, models) during the design process. Today, designers have very few
        options with regards to monetizing their work. Manufacturing your own
        designs requires a great lift; establishing a supply chain, creating a
        business model, advertising your product, handling sales, shipping and
        customer services, with most designers opting to not handle such an
        operation. An alternative to this is to advertise your design for sale
        through a marketplace. Today, there are several outlets that are widely
        used allowing you to advertise your work. Currently, all of these
        marketplaces are centralised. This removes a degree of sales and
        licensing control from the designer as well as reducing potential
        revenue by requiring payment for use of the service/marketplace.
        Desine.io aims to deliver a decentralised application for creating,
        trading and licensing your 3D assets, putting the designer in control of
        the designs they create. However, this workflow isn’t without its
        compromises and considerations.
        <h2>Model security and copyright</h2>
        Currently, Desine.io uses IPFS for storage of your 3D model. The
        InterPlanetary File System (IPFS) is a peer-to-peer file storage and
        sharing system. This is a free to use, decentralised, censorship
        resistant storage system, ensuring your data persists forever. However,
        this does mean that your model data is accessible to whomever wants it.
        There are two approaches that could be taken here. Either, no action is
        taken and we leave model data accessible or we implement some level of
        encryption on the data. Whilst the latter may appear the obvious
        approach, it isn’t necessarily that trivial. Designs of any sort, 2D or
        3D can be copied, and inevitably, if they prove to be popular, likely
        will be. Fakes and homages litter all industries. The issue that
        persists at the moment is one of verification, it is almost impossible
        to verify that you are buying a genuine item, we simply “trust” that the
        proveryer is honest. What this means to say is, encryption doesn’t
        remove plagiarism, it may slow it down, but eventually we’ll arrive at
        the same point. Instead, with desine.io we are focusing on creating a
        mechanism to prove ownership of the 3D model. Depending on your business
        and use case, this can be beneficial in numerous ways; as a seller you
        can confidently demonstrate that you’re offering the original design and
        as a buyer you can be assured you’re not buying a fake or copied item.
        That said, we do recognise the apprehension of exposing your work in
        this way. That’s why we’ll be consulting with users to gain a wider
        opinion on the subject. Ultimately we want this technology to grow and
        appreciate that the shift to open access designs may be too great
        initially and a degree of data encryption may be required.
        <h2>New business models</h2>
        Furthermore, Desine.io’s approach hopes to open up new business models
        for designers, controlled by code and therefore removing a lot of the
        administrative burden. We wish to make licensing of designs possible.
        This way the designer can retain ownership of the design whilst still
        monetizing the asset. This is also beneficial to the purchaser, who
        doesn’t need to commit to the risk of making a full design purchase, but
        can simply loan the item for a set period of time. Controlled by code,
        these time limited licenses will automatically be initiated and
        terminated by the blockchain. This type of capability will however take
        time to develop and many considerations need to be made to ensure that
        the implementation is secure and safe for both the licensor and the
        licensee. Again, we’ll be consulting with users to garner opinion on the
        types of licensing models that are most applicable to the types of work
        they produce. Hopefully this post has given some insight into a few of
        the opportunities and challenges present with the technology that
        Desine.io are developing. We’d love this development process to be a
        conversation, and guided by the requirements of the user, such that we
        can develop the most useful platform possible. If you have any thoughts,
        feelings, concerns or questions please do reach out. Either directly
        through our site, at design.io or via twitter @Desine_dapp. Thanks, Rob
        + Tom
      </div>
    </Post>
  );
};
