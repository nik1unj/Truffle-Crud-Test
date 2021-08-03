  const Crud = artifacts.require('Crud');
  
  contract('Crud', () => {
    let crud = null;
    before(async() => {
        crud= await Crud.deployed();
    });

    it('Should create a new user', async() => {
        await crud.create('nikunj');
        const user = await crud.read(1);
        assert(user[0].toNumber()===1);
        assert(user[1]==='nikunj');    
    });

    it('Should update a user', async() => {
        await crud.update(1,'nikunjRamani');
        const user = await crud.read(1);
        assert(user[0].toNumber()===1);
        assert(user[1]==='nikunjRamani');    
    });

    it('Should not update a non-existing user', async() => {
        try{
            await crud.update(2,'Keyur');
        }catch(e){
            assert(e.message.includes('User does not exist!'));
            return;
        }
        assert(false);
    });

    it('destroy a user', async() => {

        await crud.destroy(1);
        try{
            await crud.read(1);
        }catch(e){
            assert(e.message.includes('User does not exist!'));
            return;
        }
        assert(false);

    });

    
    it('destroy not destroy non-exisitng a user', async() => {

    
        try{
            await crud.destroy(20);
        }catch(e){
            assert(e.message.includes('User does not exist!'));
            return;
        }
        assert(false);

    });

  });