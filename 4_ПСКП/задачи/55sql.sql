use [univer]
go

create procedure GET_PULPITS @f nvarchar(10)
as begin
	print 'params: ' + @f;
	select pulpit, pulpit_name, faculty from pulpit where faculty=@f;
end;